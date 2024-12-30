import { Middleware, ExpressMiddlewareInterface } from "routing-controllers";

import { logger } from "../lib/logger.js";

@Middleware({ type: "before" })
export class LoggingMiddleware implements ExpressMiddlewareInterface {
  use(request: any, response: any, next: (err?: any) => any): void {
    logger.info(`Incoming request: ${request.method} ${request.url}`);
    next();
  }
}
