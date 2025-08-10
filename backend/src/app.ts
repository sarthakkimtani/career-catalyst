import "dotenv/config";
import "reflect-metadata";

import cors from "cors";
import express from "express";
import { useExpressServer } from "routing-controllers";
import { toNodeHandler } from "better-auth/node";

import { InternshipController } from "./controllers/InternshipController.js";

import { LoggingMiddleware } from "./middlewares/LoggingMiddleware.js";
import { CustomErrorHandler } from "./middlewares/CustomErrorHandler.js";
import { authorizationChecker } from "./middlewares/authorizationChecker.js";

import { auth } from "./lib/auth.js";
import { logger } from "./lib/logger.js";
import { CronScheduler } from "./jobs/CronScheduler.js";
import { testConnection, createInternshipIndex } from "./lib/elasticsearch.js";

const PORT = process.env.PORT;
const corsOptions = {
  origin: process.env.ORIGIN_URL,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

const app = express();
app.use(cors(corsOptions));

useExpressServer(app, {
  controllers: [InternshipController],
  middlewares: [LoggingMiddleware, CustomErrorHandler],
  authorizationChecker: authorizationChecker,
  defaultErrorHandler: false,
  classTransformer: true,
});

app.all("/auth/*", toNodeHandler(auth));

async function initializeElasticsearch() {
  try {
    const isConnected = await testConnection();
    if (isConnected) {
      await createInternshipIndex();
      CronScheduler.start();
      logger.info("Elasticsearch initialized and cron jobs started");
    } else {
      logger.warn("Elasticsearch is not available. Search will fallback to database.");
    }
  } catch (error) {
    logger.error("Error initializing Elasticsearch:", error);
  }
}

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
  initializeElasticsearch();
});
