import { IsOptional, IsString, IsEnum, IsDateString } from "class-validator";

export enum TrendPeriod {
  LAST_7_DAYS = "7days",
  LAST_30_DAYS = "30days",
  LAST_3_MONTHS = "3months",
  LAST_6_MONTHS = "6months",
  LAST_YEAR = "1year",
  ALL_TIME = "alltime",
}

export enum TrendType {
  SKILLS = "skills",
  LOCATIONS = "locations",
  COMPANIES = "companies",
  STIPENDS = "stipends",
  DURATION = "duration",
}

export class TrendsQueryParams {
  @IsOptional()
  @IsEnum(TrendPeriod)
  period?: TrendPeriod = TrendPeriod.ALL_TIME;

  @IsOptional()
  @IsEnum(TrendType)
  type?: TrendType;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;
}
