import { Prisma } from "@prisma/client";
import { NotFoundError } from "routing-controllers";

import prisma from "../lib/prisma.js";
import { InternshipQueryParams } from "../dtos/InternshipQueryParams.js";
import { ElasticsearchService } from "../services/ElasticsearchService.js";

const PAGE_SIZE = 30;
const elasticsearchService = new ElasticsearchService();

export class InternshipRepository {
  async getPaginatedInternships(page: number, filters: InternshipQueryParams = {}) {
    try {
      return await elasticsearchService.searchInternships(filters, page, PAGE_SIZE);
    } catch (error) {
      console.error("Elasticsearch failed, falling back to database:", error);
      return this.getFallbackInternships(page, filters);
    }
  }

  private async getFallbackInternships(page: number, filters: InternshipQueryParams = {}) {
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
      count,
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

    if (filters.duration) {
      const durationRange = filters.duration.toLowerCase();

      if (durationRange === "0-3 months") {
        where.duration = { gte: 0, lte: 3 };
      } else if (durationRange === "3-6 months") {
        where.duration = { gt: 3, lte: 6 };
      } else if (durationRange === "6+ months") {
        where.duration = { gt: 6 };
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
