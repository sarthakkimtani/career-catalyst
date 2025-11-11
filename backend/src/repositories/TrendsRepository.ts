import { Prisma } from "@prisma/client";
import prisma from "../lib/prisma.js";
import { TrendsQueryParams, TrendPeriod } from "../dtos/TrendsQueryParams.js";

export interface TrendData {
  label: string;
  count: number;
  percentage: number;
}

export interface SkillTrend extends TrendData {
  growth?: number; // percentage growth compared to previous period
}

export interface LocationTrend extends TrendData {
  avgStipend: number;
  avgDuration: number;
}

export interface CompanyTrend extends TrendData {
  avgStipend: number;
  hiringSince: number;
  candidatesHired: number;
}

export interface StipendDistribution {
  range: string;
  count: number;
  percentage: number;
}

export interface DurationDistribution {
  range: string;
  count: number;
  percentage: number;
}

export interface OverallStats {
  totalInternships: number;
  totalCompanies: number;
  totalSkills: number;
  avgStipend: number;
  avgDuration: number;
  remotePercentage: number;
  growthRate: number; // compared to previous period
}

export class TrendsRepository {
  private getDateFilter(period: TrendPeriod, startDate?: string, endDate?: string): Date {
    if (startDate && endDate) {
      return new Date(startDate);
    }

    // For ALL_TIME, return a very old date (e.g., year 2000)
    if (period === TrendPeriod.ALL_TIME) {
      return new Date("2000-01-01");
    }

    const now = new Date();
    switch (period) {
      case TrendPeriod.LAST_7_DAYS:
        return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      case TrendPeriod.LAST_30_DAYS:
        return new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      case TrendPeriod.LAST_3_MONTHS:
        return new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
      case TrendPeriod.LAST_6_MONTHS:
        return new Date(now.getTime() - 180 * 24 * 60 * 60 * 1000);
      case TrendPeriod.LAST_YEAR:
        return new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
      default:
        return new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    }
  }

  async getOverallStats(filters: TrendsQueryParams): Promise<OverallStats> {
    const dateFilter = this.getDateFilter(filters.period!, filters.startDate, filters.endDate);
    const endDate = filters.endDate ? new Date(filters.endDate) : new Date();

    const whereClause: Prisma.InternshipWhereInput = {
      scrapedAt: {
        gte: dateFilter,
        lte: endDate,
      },
    };

    if (filters.location) {
      whereClause.location = {
        contains: filters.location,
        mode: "insensitive",
      };
    }

    const [totalInternships, companies, skills, avgData, remoteCount] = await Promise.all([
      prisma.internship.count({ where: whereClause }),
      prisma.internship.findMany({
        where: whereClause,
        distinct: ["companyId"],
        select: { companyId: true },
      }),
      prisma.internship.findMany({
        where: whereClause,
        include: { skills: true },
      }),
      prisma.internship.aggregate({
        where: whereClause,
        _avg: {
          stipend: true,
          duration: true,
        },
      }),
      prisma.internship.count({
        where: {
          ...whereClause,
          location: "Work from home",
        },
      }),
    ]);

    // Calculate unique skills
    const uniqueSkills = new Set();
    skills.forEach((internship) => {
      internship.skills.forEach((skill) => uniqueSkills.add(skill.id));
    });

    // Calculate growth rate compared to previous period
    const previousPeriodStart = new Date(
      dateFilter.getTime() - (endDate.getTime() - dateFilter.getTime())
    );
    const previousPeriodCount = await prisma.internship.count({
      where: {
        ...whereClause,
        scrapedAt: {
          gte: previousPeriodStart,
          lt: dateFilter,
        },
      },
    });

    const growthRate =
      previousPeriodCount > 0
        ? ((totalInternships - previousPeriodCount) / previousPeriodCount) * 100
        : 0;

    return {
      totalInternships,
      totalCompanies: companies.length,
      totalSkills: uniqueSkills.size,
      avgStipend: Math.round(avgData._avg.stipend || 0),
      avgDuration: Math.round(avgData._avg.duration || 0),
      remotePercentage: totalInternships > 0 ? (remoteCount / totalInternships) * 100 : 0,
      growthRate,
    };
  }

  async getTopSkills(filters: TrendsQueryParams, limit: number = 20): Promise<SkillTrend[]> {
    const dateFilter = this.getDateFilter(filters.period!, filters.startDate, filters.endDate);
    const endDate = filters.endDate ? new Date(filters.endDate) : new Date();

    const whereClause: Prisma.InternshipWhereInput = {
      scrapedAt: {
        gte: dateFilter,
        lte: endDate,
      },
    };

    if (filters.location) {
      whereClause.location = {
        contains: filters.location,
        mode: "insensitive",
      };
    }

    const result = await prisma.skill.findMany({
      include: {
        internships: {
          where: whereClause,
        },
      },
      orderBy: {
        internships: {
          _count: "desc",
        },
      },
      take: limit,
    });

    const totalInternships = await prisma.internship.count({ where: whereClause });

    // Get previous period data for growth calculation
    const previousPeriodStart = new Date(
      dateFilter.getTime() - (endDate.getTime() - dateFilter.getTime())
    );
    const previousPeriodData = await prisma.skill.findMany({
      include: {
        internships: {
          where: {
            ...whereClause,
            scrapedAt: {
              gte: previousPeriodStart,
              lt: dateFilter,
            },
          },
        },
      },
    });

    const previousPeriodMap = new Map(
      previousPeriodData.map((skill) => [skill.id, skill.internships.length])
    );

    return result
      .filter((skill) => skill.internships.length > 0)
      .map((skill) => {
        const count = skill.internships.length;
        const previousCount = previousPeriodMap.get(skill.id) || 0;
        const growth = previousCount > 0 ? ((count - previousCount) / previousCount) * 100 : 0;

        return {
          label: skill.name,
          count,
          percentage: totalInternships > 0 ? (count / totalInternships) * 100 : 0,
          growth,
        };
      });
  }

  async getTopLocations(filters: TrendsQueryParams, limit: number = 15): Promise<LocationTrend[]> {
    const dateFilter = this.getDateFilter(filters.period!, filters.startDate, filters.endDate);
    const endDate = filters.endDate ? new Date(filters.endDate) : new Date();

    const whereClause: Prisma.InternshipWhereInput = {
      scrapedAt: {
        gte: dateFilter,
        lte: endDate,
      },
    };

    const result = await prisma.internship.groupBy({
      by: ["location"],
      where: whereClause,
      _count: {
        location: true,
      },
      _avg: {
        stipend: true,
        duration: true,
      },
      orderBy: {
        _count: {
          location: "desc",
        },
      },
      take: limit,
    });

    const totalInternships = await prisma.internship.count({ where: whereClause });

    return result.map((item) => ({
      label: item.location,
      count: item._count.location,
      percentage: totalInternships > 0 ? (item._count.location / totalInternships) * 100 : 0,
      avgStipend: Math.round(item._avg.stipend || 0),
      avgDuration: Math.round(item._avg.duration || 0),
    }));
  }

  async getTopCompanies(filters: TrendsQueryParams, limit: number = 15): Promise<CompanyTrend[]> {
    const dateFilter = this.getDateFilter(filters.period!, filters.startDate, filters.endDate);
    const endDate = filters.endDate ? new Date(filters.endDate) : new Date();

    const whereClause: Prisma.InternshipWhereInput = {
      scrapedAt: {
        gte: dateFilter,
        lte: endDate,
      },
    };

    if (filters.location) {
      whereClause.location = {
        contains: filters.location,
        mode: "insensitive",
      };
    }

    const result = await prisma.company.findMany({
      include: {
        internships: {
          where: whereClause,
        },
      },
      orderBy: {
        internships: {
          _count: "desc",
        },
      },
      take: limit,
    });

    const totalInternships = await prisma.internship.count({ where: whereClause });

    return result
      .filter((company) => company.internships.length > 0)
      .map((company) => {
        const count = company.internships.length;
        const avgStipend =
          company.internships.reduce((sum, internship) => sum + internship.stipend, 0) / count;

        return {
          label: company.name,
          count,
          percentage: totalInternships > 0 ? (count / totalInternships) * 100 : 0,
          avgStipend: Math.round(avgStipend),
          hiringSince: company.hiringSince,
          candidatesHired: company.candidatesHired,
        };
      });
  }

  async getStipendDistribution(filters: TrendsQueryParams): Promise<StipendDistribution[]> {
    const dateFilter = this.getDateFilter(filters.period!, filters.startDate, filters.endDate);
    const endDate = filters.endDate ? new Date(filters.endDate) : new Date();

    const whereClause: Prisma.InternshipWhereInput = {
      scrapedAt: {
        gte: dateFilter,
        lte: endDate,
      },
    };

    if (filters.location) {
      whereClause.location = {
        contains: filters.location,
        mode: "insensitive",
      };
    }

    const stipendRanges = [
      { range: "₹0 - ₹5,000", min: 0, max: 5000 },
      { range: "₹5,001 - ₹10,000", min: 5001, max: 10000 },
      { range: "₹10,001 - ₹20,000", min: 10001, max: 20000 },
      { range: "₹20,001 - ₹30,000", min: 20001, max: 30000 },
      { range: "₹30,001 - ₹50,000", min: 30001, max: 50000 },
      { range: "₹50,000+", min: 50001, max: Number.MAX_SAFE_INTEGER },
    ];

    const totalInternships = await prisma.internship.count({ where: whereClause });

    const distribution = await Promise.all(
      stipendRanges.map(async (range) => {
        const count = await prisma.internship.count({
          where: {
            ...whereClause,
            stipend: {
              gte: range.min,
              ...(range.max !== Number.MAX_SAFE_INTEGER && { lte: range.max }),
            },
          },
        });

        return {
          range: range.range,
          count,
          percentage: totalInternships > 0 ? (count / totalInternships) * 100 : 0,
        };
      })
    );

    return distribution.filter((item) => item.count > 0);
  }

  async getDurationDistribution(filters: TrendsQueryParams): Promise<DurationDistribution[]> {
    const dateFilter = this.getDateFilter(filters.period!, filters.startDate, filters.endDate);
    const endDate = filters.endDate ? new Date(filters.endDate) : new Date();

    const whereClause: Prisma.InternshipWhereInput = {
      scrapedAt: {
        gte: dateFilter,
        lte: endDate,
      },
    };

    if (filters.location) {
      whereClause.location = {
        contains: filters.location,
        mode: "insensitive",
      };
    }

    const durationRanges = [
      { range: "1-2 months", min: 1, max: 2 },
      { range: "3-4 months", min: 3, max: 4 },
      { range: "5-6 months", min: 5, max: 6 },
      { range: "7-9 months", min: 7, max: 9 },
      { range: "10-12 months", min: 10, max: 12 },
      { range: "12+ months", min: 13, max: Number.MAX_SAFE_INTEGER },
    ];

    const totalInternships = await prisma.internship.count({ where: whereClause });

    const distribution = await Promise.all(
      durationRanges.map(async (range) => {
        const count = await prisma.internship.count({
          where: {
            ...whereClause,
            duration: {
              gte: range.min,
              ...(range.max !== Number.MAX_SAFE_INTEGER && { lte: range.max }),
            },
          },
        });

        return {
          range: range.range,
          count,
          percentage: totalInternships > 0 ? (count / totalInternships) * 100 : 0,
        };
      })
    );

    return distribution.filter((item) => item.count > 0);
  }

  async getTimeSeriesData(
    filters: TrendsQueryParams
  ): Promise<Array<{ date: string; count: number }>> {
    const dateFilter = this.getDateFilter(filters.period!, filters.startDate, filters.endDate);
    const endDate = filters.endDate ? new Date(filters.endDate) : new Date();

    const whereClause: Prisma.InternshipWhereInput = {
      scrapedAt: {
        gte: dateFilter,
        lte: endDate,
      },
    };

    if (filters.location) {
      whereClause.location = {
        contains: filters.location,
        mode: "insensitive",
      };
    }

    // Determine the grouping interval based on the period
    let groupBy: string;
    switch (filters.period) {
      case TrendPeriod.LAST_7_DAYS:
        groupBy = 'DATE("scrapedAt")';
        break;
      case TrendPeriod.LAST_30_DAYS:
        groupBy = 'DATE("scrapedAt")';
        break;
      case TrendPeriod.LAST_3_MONTHS:
      case TrendPeriod.LAST_6_MONTHS:
        groupBy = "DATE_TRUNC('week', \"scrapedAt\")";
        break;
      case TrendPeriod.LAST_YEAR:
      case TrendPeriod.ALL_TIME:
        groupBy = "DATE_TRUNC('month', \"scrapedAt\")";
        break;
      default:
        groupBy = 'DATE("scrapedAt")';
    }

    const result = await prisma.$queryRaw<Array<{ date: Date; count: bigint }>>`
      SELECT ${Prisma.raw(groupBy)} as date, COUNT(*) as count
      FROM "Internship"
      WHERE "scrapedAt" >= ${dateFilter}
        AND "scrapedAt" <= ${endDate}
        ${
          filters.location
            ? Prisma.sql`AND "location" ILIKE ${"%" + filters.location + "%"}`
            : Prisma.empty
        }
      GROUP BY ${Prisma.raw(groupBy)}
      ORDER BY date ASC
    `;

    return result.map((item) => ({
      date: item.date.toISOString().split("T")[0],
      count: Number(item.count),
    }));
  }
}
