import prisma from "../lib/prisma.js";
import { ElasticsearchService } from "../services/ElasticsearchService.js";
import { createInternshipIndex } from "../lib/elasticsearch.js";
import { logger } from "../lib/logger.js";

const elasticsearchService = new ElasticsearchService();

export class ReindexJob {
  async execute() {
    try {
      logger.info("Starting reindexing process...");

      // Ensure index exists
      await createInternshipIndex();

      // Clear existing index
      await elasticsearchService.deleteIndex();
      await createInternshipIndex();

      // Fetch all internships with related data
      const internships = await prisma.internship.findMany({
        include: {
          company: true,
          skills: true,
        },
      });

      if (internships.length === 0) {
        logger.info("No internships found to index");
        return;
      }

      // Process in batches to avoid memory issues
      const batchSize = 100;
      const batches = [];

      for (let i = 0; i < internships.length; i += batchSize) {
        batches.push(internships.slice(i, i + batchSize));
      }

      let totalIndexed = 0;

      for (const batch of batches) {
        await elasticsearchService.bulkIndexInternships(batch);
        totalIndexed += batch.length;
        logger.info(`Indexed ${totalIndexed}/${internships.length} internships`);
      }

      logger.info(`Reindexing completed successfully. Total indexed: ${totalIndexed}`);
    } catch (error) {
      logger.error("Reindexing failed:", error);
      throw error;
    }
  }

  async executeIncremental() {
    try {
      logger.info("Starting incremental reindexing process...");

      // Ensure index exists
      await createInternshipIndex();

      // Get internships modified in the last 3 days (accounting for scraper running every 2 days)
      const threeDaysAgo = new Date();
      threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

      const recentInternships = await prisma.internship.findMany({
        where: {
          scrapedAt: {
            gte: threeDaysAgo,
          },
        },
        include: {
          company: true,
          skills: true,
        },
      });

      if (recentInternships.length === 0) {
        logger.info("No recent internships found to index");
        return;
      }

      // Process in batches
      const batchSize = 100;
      const batches = [];

      for (let i = 0; i < recentInternships.length; i += batchSize) {
        batches.push(recentInternships.slice(i, i + batchSize));
      }

      let totalIndexed = 0;

      for (const batch of batches) {
        await elasticsearchService.bulkIndexInternships(batch);
        totalIndexed += batch.length;
        logger.info(`Indexed ${totalIndexed}/${recentInternships.length} recent internships`);
      }

      logger.info(`Incremental reindexing completed successfully. Total indexed: ${totalIndexed}`);
    } catch (error) {
      logger.error("Incremental reindexing failed:", error);
      throw error;
    }
  }
}
