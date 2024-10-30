import { ExpressErrorMiddlewareInterface, HttpError, Middleware } from "routing-controllers";
import { Request } from "express";

import logger from "../lib/logger.js";

@Middleware({ type: "after" })
export class CustomErrorHandler implements ExpressErrorMiddlewareInterface {
  error(error: any, request: Request, response: any, next: (err?: any) => any): void {
    logger.error(`${request.method} ${request.url}: ${error.message}`);
    if (error instanceof HttpError) {
      response.status(error.httpCode).json({ success: false, message: error.message });
    } else {
      response.status(500).json({ success: false, message: "Something went wrong!" });
    }
  }
}
