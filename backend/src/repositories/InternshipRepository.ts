import { Prisma } from "@prisma/client";
import { NotFoundError } from "routing-controllers";

import prisma from "../lib/prisma.js";

export class UserRepository {
  async getAllInternships(lastId?: number) {
    const pageSize = 42;
    const internshipFields = Object.fromEntries(
      Object.keys(Prisma.InternshipScalarFieldEnum)
        .filter((field) => field !== "description")
        .map((field) => [field, true])
    );

    return await prisma.internship.findMany({
      take: pageSize,
      skip: lastId ? 1 : 0,
      cursor: lastId ? { id: lastId } : undefined,
      orderBy: {
        id: "asc",
      },
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
