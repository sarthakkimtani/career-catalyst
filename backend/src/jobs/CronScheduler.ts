import * as cron from "node-cron";
import { ReindexJob } from "./ReindexJob.js";
import { logger } from "../lib/logger.js";

const reindexJob = new ReindexJob();

export class CronScheduler {
  static start() {
    // Run full reindex every Sunday at 2 AM
    cron.schedule("0 2 * * 0", async () => {
      logger.info("Running scheduled full reindex job");
      try {
        await reindexJob.execute();
      } catch (error) {
        logger.error("Scheduled full reindex job failed:", error);
      }
    });

    // Run incremental reindex every day at 3 AM
    cron.schedule("0 3 * * *", async () => {
      logger.info("Running scheduled incremental reindex job");
      try {
        await reindexJob.executeIncremental();
      } catch (error) {
        logger.error("Scheduled incremental reindex job failed:", error);
      }
    });

    // Run incremental reindex every 6 hours to catch any updates
    cron.schedule("0 */6 * * *", async () => {
      logger.info("Running scheduled incremental reindex job (6-hourly)");
      try {
        await reindexJob.executeIncremental();
      } catch (error) {
        logger.error("Scheduled incremental reindex job failed:", error);
      }
    });

    logger.info("Cron jobs scheduled successfully");
  }

  static async runFullReindex() {
    logger.info("Running manual full reindex");
    try {
      await reindexJob.execute();
    } catch (error) {
      logger.error("Manual full reindex failed:", error);
      throw error;
    }
  }

  static async runIncrementalReindex() {
    logger.info("Running manual incremental reindex");
    try {
      await reindexJob.executeIncremental();
    } catch (error) {
      logger.error("Manual incremental reindex failed:", error);
      throw error;
    }
  }
}
