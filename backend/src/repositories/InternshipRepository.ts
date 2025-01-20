import { Prisma } from "@prisma/client";
import { NotFoundError } from "routing-controllers";

import { InternshipQueryParams } from "../dtos/InternshipQueryParams.js";
import prisma from "../lib/prisma.js";

const PAGE_SIZE = 30;

export class InternshipRepository {
  async getPaginatedInternships(page: number, filters: InternshipQueryParams = {}) {
    const skip = (page - 1) * PAGE_SIZE;
    const where = this.buildFilters(filters);

    const internshipFields = Object.fromEntries(
      Object.keys(Prisma.InternshipScalarFieldEnum)
        .filter((field) => field !== "description")
        .map((field) => [field, true])
    );

    const [data, count] = await Promise.all([
      prisma.internship.findMany({
        where,
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
      }),
      prisma.internship.count({ where }),
    ]);

    return {
      data,
      total: Math.ceil(count / PAGE_SIZE),
    };
  }

  private buildFilters(filters: InternshipQueryParams): Prisma.InternshipWhereInput {
    const where: Prisma.InternshipWhereInput = {};

    if (filters.title) {
      where.title = {
        contains: filters.title,
        mode: "insensitive",
      };
    }
    if (filters.location) {
      where.location = {
        contains: filters.location,
        mode: "insensitive",
      };
    }
    if (filters.stipend) {
      where.stipend = {
        gte: filters.stipend,
      };
    }

    if (filters.mode) {
      const modes = filters.mode.split(",").map((mode) => mode.trim().toLowerCase());
      if (modes.includes("remote")) {
        where.location = "Work from home";
      } else {
        where.location = { not: "Work from home" };
      }
    }

    return where;
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
