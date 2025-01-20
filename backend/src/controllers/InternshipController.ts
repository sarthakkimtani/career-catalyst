import { Get, JsonController, Param, Authorized, QueryParams } from "routing-controllers";

import { InternshipRepository } from "../repositories/InternshipRepository.js";
import { InternshipQueryParams } from "../dtos/InternshipQueryParams.js";

const internshipRepository = new InternshipRepository();

@JsonController("/internships")
export class InternshipController {
  @Authorized()
  @Get("/")
  async fetchInternships(@QueryParams() query: InternshipQueryParams) {
    const { page } = query;
    return await internshipRepository.getPaginatedInternships(page || 1, query);
  }

  @Authorized()
  @Get("/:id")
  async fetchInternshipById(@Param("id") id: number) {
    return await internshipRepository.getInternshipById(id);
  }
}
