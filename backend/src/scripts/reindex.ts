#!/usr/bin/env node

import { ReindexJob } from "../jobs/ReindexJob.js";
import { testConnection } from "../lib/elasticsearch.js";
import { logger } from "../lib/logger.js";

const reindexJob = new ReindexJob();

async function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  const isConnected = await testConnection();
  if (!isConnected) {
    logger.error("Elasticsearch is not available. Please ensure it's running on port 9200.");
    process.exit(1);
  }

  switch (command) {
    case "full":
      logger.info("Starting full reindex...");
      await reindexJob.execute();
      break;

    case "incremental":
      logger.info("Starting incremental reindex...");
      await reindexJob.executeIncremental();
      break;

    default:
      logger.info("Usage: npm run reindex [full|incremental]");
      logger.info("  full        - Reindex all internships");
      logger.info("  incremental - Reindex only recent internships");
      break;
  }
}

main().catch((error) => {
  logger.error("Reindex script failed:", error);
  process.exit(1);
});
