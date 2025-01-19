import { Prisma } from "@prisma/client";
import { NotFoundError } from "routing-controllers";

import prisma from "../lib/prisma.js";

const PAGE_SIZE = 30;

export class UserRepository {
  async getPaginatedInternships(page: number) {
    const count = await prisma.internship.count();
    const skip = (page - 1) * PAGE_SIZE;

    const internshipFields = Object.fromEntries(
      Object.keys(Prisma.InternshipScalarFieldEnum)
        .filter((field) => field !== "description")
        .map((field) => [field, true])
    );

    const data = await prisma.internship.findMany({
      skip,
      take: PAGE_SIZE,
      select: {
        ...internshipFields,
        company: {
          select: {
            name: true,
            logoUrl: true,
          },
        },
      },
    });

    return { data, total: count / PAGE_SIZE };
  }

  async getInternshipById(id: number) {
    const data = await prisma.internship.findFirst({
      where: { id },
      include: { company: true, skills: true },
    });
    if (!data) {
      throw new NotFoundError("Internship not found");
    }
    return data;
  }
}
