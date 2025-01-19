import { Get, JsonController, QueryParam, Param, Authorized } from "routing-controllers";

import { UserRepository } from "../repositories/InternshipRepository.js";

const userRepository = new UserRepository();

@JsonController("/internships")
export class InternshipController {
  // @Authorized()
  @Get("/")
  async fetchInternships(@QueryParam("page", { required: false }) page: number = 1) {
    return await userRepository.getPaginatedInternships(page);
  }

  @Authorized()
  @Get("/:id")
  async fetchInternshipById(@Param("id") id: number) {
    return await userRepository.getInternshipById(id);
  }
}
