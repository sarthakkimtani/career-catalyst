import "dotenv/config";
import "reflect-metadata";
import { createExpressServer } from "routing-controllers";

import { InternshipController } from "./controllers/InternshipController.js";
import { LoggingMiddleware } from "./middlewares/LoggingMiddleware.js";
import { CustomErrorHandler } from "./middlewares/CustomErrorHandler.js";
import logger from "./lib/logger.js";

const PORT = process.env.PORT;

const app = createExpressServer({
  controllers: [InternshipController],
  middlewares: [LoggingMiddleware, CustomErrorHandler],
  defaultErrorHandler: false,
  classTransformer: true,
});

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
