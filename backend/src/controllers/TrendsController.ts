import { Get, JsonController, Authorized, QueryParams } from "routing-controllers";

import { TrendsRepository } from "../repositories/TrendsRepository.js";
import { TrendsQueryParams, TrendType } from "../dtos/TrendsQueryParams.js";

const trendsRepository = new TrendsRepository();

@JsonController("/trends")
export class TrendsController {
  @Authorized()
  @Get("/")
  async getTrends(@QueryParams() query: TrendsQueryParams) {
    const { type } = query;

    switch (type) {
      case TrendType.SKILLS:
        return await trendsRepository.getTopSkills(query);
      case TrendType.LOCATIONS:
        return await trendsRepository.getTopLocations(query);
      case TrendType.COMPANIES:
        return await trendsRepository.getTopCompanies(query);
      case TrendType.STIPENDS:
        return await trendsRepository.getStipendDistribution(query);
      case TrendType.DURATION:
        return await trendsRepository.getDurationDistribution(query);
      default:
        // Return overview with multiple trend types
        const [skills, locations, companies, stipends, duration] = await Promise.all([
          trendsRepository.getTopSkills(query, 10),
          trendsRepository.getTopLocations(query, 10),
          trendsRepository.getTopCompanies(query, 10),
          trendsRepository.getStipendDistribution(query),
          trendsRepository.getDurationDistribution(query),
        ]);

        return {
          skills,
          locations,
          companies,
          stipends,
          duration,
        };
    }
  }

  @Authorized()
  @Get("/overview")
  async getOverview(@QueryParams() query: TrendsQueryParams) {
    return await trendsRepository.getOverallStats(query);
  }

  @Authorized()
  @Get("/skills")
  async getTopSkills(@QueryParams() query: TrendsQueryParams) {
    return await trendsRepository.getTopSkills(query);
  }

  @Authorized()
  @Get("/locations")
  async getTopLocations(@QueryParams() query: TrendsQueryParams) {
    return await trendsRepository.getTopLocations(query);
  }

  @Authorized()
  @Get("/companies")
  async getTopCompanies(@QueryParams() query: TrendsQueryParams) {
    return await trendsRepository.getTopCompanies(query);
  }

  @Authorized()
  @Get("/stipend-distribution")
  async getStipendDistribution(@QueryParams() query: TrendsQueryParams) {
    return await trendsRepository.getStipendDistribution(query);
  }

  @Authorized()
  @Get("/duration-distribution")
  async getDurationDistribution(@QueryParams() query: TrendsQueryParams) {
    return await trendsRepository.getDurationDistribution(query);
  }

  @Authorized()
  @Get("/time-series")
  async getTimeSeriesData(@QueryParams() query: TrendsQueryParams) {
    return await trendsRepository.getTimeSeriesData(query);
  }

  @Authorized()
  @Get("/dashboard")
  async getDashboardData(@QueryParams() query: TrendsQueryParams) {
    const [
      overview,
      topSkills,
      topLocations,
      topCompanies,
      stipendDistribution,
      durationDistribution,
      timeSeriesData,
    ] = await Promise.all([
      trendsRepository.getOverallStats(query),
      trendsRepository.getTopSkills(query, 10),
      trendsRepository.getTopLocations(query, 8),
      trendsRepository.getTopCompanies(query, 8),
      trendsRepository.getStipendDistribution(query),
      trendsRepository.getDurationDistribution(query),
      trendsRepository.getTimeSeriesData(query),
    ]);

    return {
      overview,
      topSkills,
      topLocations,
      topCompanies,
      stipendDistribution,
      durationDistribution,
      timeSeriesData,
      lastUpdated: new Date().toISOString(),
    };
  }
}
