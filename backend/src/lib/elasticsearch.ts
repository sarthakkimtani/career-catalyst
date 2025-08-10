import { Client } from "@elastic/elasticsearch";
import { logger } from "./logger.js";

const client = new Client({
  node: process.env.ELASTICSEARCH_URL,
  auth: {
    username: process.env.ES_USERNAME ?? "",
    password: process.env.ES_PASSWORD ?? "",
  },
});

export const elasticsearch = client;

export const INTERNSHIP_INDEX = "internships";

export const testConnection = async () => {
  try {
    const response = await client.ping();
    logger.info("Elasticsearch connection successful");
    return true;
  } catch (error) {
    logger.error(`Elasticsearch connection failed: ${error}`);
    return false;
  }
};

export const createInternshipIndex = async () => {
  try {
    const exists = await client.indices.exists({
      index: INTERNSHIP_INDEX,
    });

    if (!exists) {
      await client.indices.create({
        index: INTERNSHIP_INDEX,
        mappings: {
          properties: {
            id: { type: "integer" },
            title: {
              type: "text",
              analyzer: "standard",
              fields: {
                keyword: { type: "keyword" },
              },
            },
            description: {
              type: "text",
              analyzer: "standard",
            },
            location: {
              type: "text",
              analyzer: "standard",
              fields: {
                keyword: { type: "keyword" },
              },
            },
            duration: { type: "integer" },
            stipend: { type: "integer" },
            scrapedAt: { type: "date" },
            company: {
              type: "object",
              properties: {
                id: { type: "integer" },
                name: {
                  type: "text",
                  analyzer: "standard",
                  fields: {
                    keyword: { type: "keyword" },
                  },
                },
                logoUrl: { type: "keyword" },
                hiringSince: { type: "integer" },
                candidatesHired: { type: "integer" },
              },
            },
            skills: {
              type: "nested",
              properties: {
                id: { type: "integer" },
                name: {
                  type: "text",
                  analyzer: "standard",
                  fields: {
                    keyword: { type: "keyword" },
                  },
                },
              },
            },
          },
        },
      });
      logger.info(`Created index: ${INTERNSHIP_INDEX}`);
    }
  } catch (error) {
    logger.error("Error creating index:", error);
    throw error;
  }
};
