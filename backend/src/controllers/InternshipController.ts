import { Get, JsonController, QueryParam, Param } from "routing-controllers";

import { UserRepository } from "../repositories/InternshipRepository.js";

const userRepository = new UserRepository();

@JsonController("/internships")
export class InternshipController {
  @Get("/")
  async fetchInternships(@QueryParam("id") id: number) {
    return await userRepository.getAllInternships(id);
  }

  @Get("/:id")
  async fetchInternshipById(@Param("id") id: number) {
    return await userRepository.getInternshipById(id);
  }
}
