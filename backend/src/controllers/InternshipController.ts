import { Get, JsonController, QueryParam, Param, Authorized } from "routing-controllers";

import { InternshipRepository } from "../repositories/InternshipRepository.js";

const internshipRepository = new InternshipRepository();

@JsonController("/internships")
export class InternshipController {
  @Authorized()
  @Get("/")
  async fetchInternships(
    @QueryParam("page", { required: false }) page: number = 1,
    @QueryParam("title", { required: false }) title?: string,
    @QueryParam("location", { required: false }) location?: string,
    @QueryParam("stipend", { required: false }) stipend?: number,
    @QueryParam("mode", { required: false }) mode?: string
  ) {
    return await internshipRepository.getPaginatedInternships(page, {
      title,
      location,
      stipend,
      mode,
    });
  }

  @Authorized()
  @Get("/:id")
  async fetchInternshipById(@Param("id") id: number) {
    return await internshipRepository.getInternshipById(id);
  }
}
