import { Request, Response } from "express";
import { Get, JsonController, Req, Res } from "routing-controllers";
import { fromNodeHeaders } from "better-auth/node";

import { auth } from "../lib/auth.js";

@JsonController("/me")
export class MeController {
  @Get("/")
  async getMe(@Req() request: Request, @Res() response: Response) {
    return await auth.api.getSession({
      headers: fromNodeHeaders(request.headers),
    });
  }
}
