import { elasticsearch, INTERNSHIP_INDEX } from "../lib/elasticsearch.js";
import { InternshipQueryParams } from "../dtos/InternshipQueryParams.js";
import { logger } from "../lib/logger.js";

export class ElasticsearchService {
  async searchInternships(filters: InternshipQueryParams, page: number = 1, pageSize: number = 30) {
    try {
      const from = (page - 1) * pageSize;
      const query = this.buildElasticsearchQuery(filters);

      const response = await elasticsearch.search({
        index: INTERNSHIP_INDEX,
        query,
        from,
        size: pageSize,
        sort: [{ _score: { order: "desc" } }, { scrapedAt: { order: "desc" } }],
      });

      const hits = response.hits.hits;
      const total =
        typeof response.hits.total === "number"
          ? response.hits.total
          : response.hits.total?.value || 0;

      return {
        data: hits.map((hit) => hit._source),
        total: Math.ceil(total / pageSize),
        count: total,
      };
    } catch (error) {
      logger.error("Elasticsearch search error:", error);
      throw error;
    }
  }

  private buildElasticsearchQuery(filters: InternshipQueryParams) {
    const must: any[] = [];
    const should: any[] = [];
    const filter: any[] = [];

    // Normalize title: strip punctuation into spaces
    const rawTitle = filters.title?.trim() || "";
    const normalizedTitle = rawTitle.replace(/[^\w\s]/g, " ");

    if (rawTitle) {
      should.push(
        {
          match_phrase: {
            title: {
              query: normalizedTitle,
              boost: 12,
              slop: 1,
            },
          },
        },
        // Exact keyword match
        {
          term: {
            "title.keyword": {
              value: rawTitle,
              boost: 8,
            },
          },
        },
        // Wildcard fallback on keyword (stripping dots)
        {
          wildcard: {
            "title.keyword": {
              value: `*${rawTitle.toLowerCase().replace(/\./g, "")}*`,
              boost: 9,
            },
          },
        },
        // Exact match with analysis
        {
          match: {
            title: {
              query: rawTitle,
              operator: "and",
              boost: 6,
            },
          },
        },
        // Skills exact match
        {
          nested: {
            path: "skills",
            query: {
              match_phrase: {
                "skills.name": {
                  query: rawTitle,
                  boost: 5,
                },
              },
            },
          },
        },
        // Company exact match
        {
          match_phrase: {
            "company.name": {
              query: rawTitle,
              boost: 4,
            },
          },
        },
        // Fuzzy title match
        {
          match: {
            title: {
              query: rawTitle,
              fuzziness: 1,
              boost: 2,
            },
          },
        }
      );
    }

    if (filters.location) {
      if (filters.mode?.toLowerCase().includes("remote")) {
        filter.push({
          term: { "location.keyword": "Work from home" },
        });
      } else {
        should.push(
          {
            match_phrase: {
              location: { query: filters.location, boost: 10 },
            },
          },
          {
            term: {
              "location.keyword": { value: filters.location, boost: 8 },
            },
          },
          {
            match_phrase_prefix: {
              location: { query: filters.location, boost: 6 },
            },
          },
          {
            match: {
              location: { query: filters.location, fuzziness: 1, boost: 2 },
            },
          }
        );
      }
    }

    if (filters.mode) {
      const modes = filters.mode.split(",").map((m) => m.trim().toLowerCase());
      if (modes.includes("remote")) {
        filter.push({ term: { "location.keyword": "Work from home" } });
      } else {
        filter.push({
          bool: { must_not: { term: { "location.keyword": "Work from home" } } },
        });
      }
    }

    if (filters.stipend) {
      filter.push({
        range: { stipend: { gte: filters.stipend } },
      });
    }

    if (filters.duration) {
      const d = filters.duration.toLowerCase();
      if (d === "0-3 months") {
        filter.push({ range: { duration: { gte: 0, lte: 3 } } });
      } else if (d === "3-6 months") {
        filter.push({ range: { duration: { gt: 3, lte: 6 } } });
      } else if (d.includes("6+")) {
        filter.push({ range: { duration: { gt: 6 } } });
      }
    }

    const boolQuery: any = {
      bool: {
        must: must.length ? must : [{ match_all: {} }],
        filter: filter.length ? filter : undefined,
        should: should.length ? should : undefined,
        minimum_should_match: should.length ? 1 : undefined,
      },
    };

    // If both title & location, require at least 30% of should clauses
    if (rawTitle && filters.location && should.length) {
      boolQuery.bool.minimum_should_match = Math.ceil(should.length * 0.3);
    }

    return boolQuery;
  }

  async indexInternship(internship: any) {
    try {
      await elasticsearch.index({
        index: INTERNSHIP_INDEX,
        id: internship.id.toString(),
        document: internship,
      });
      logger.info(`Indexed internship ${internship.id}`);
    } catch (error) {
      logger.error(`Error indexing internship ${internship.id}:`, error);
      throw error;
    }
  }

  async bulkIndexInternships(internships: any[]) {
    try {
      const operations = internships.flatMap((internship) => [
        { index: { _index: INTERNSHIP_INDEX, _id: internship.id.toString() } },
        internship,
      ]);

      const response = await elasticsearch.bulk({ operations });

      if (response.errors) {
        logger.error("Bulk indexing errors:", response.items);
      } else {
        logger.info(`Bulk indexed ${internships.length} internships`);
      }

      return response;
    } catch (error) {
      logger.error("Bulk indexing error:", error);
      throw error;
    }
  }

  async deleteIndex() {
    try {
      await elasticsearch.indices.delete({ index: INTERNSHIP_INDEX });
      logger.info(`Deleted index: ${INTERNSHIP_INDEX}`);
    } catch (error) {
      logger.error("Error deleting index:", error);
      throw error;
    }
  }
}
