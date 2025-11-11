export interface TrendData {
  label: string;
  count: number;
  percentage: number;
}

export interface SkillTrend extends TrendData {
  growth?: number;
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
  growthRate: number;
}

export interface TimeSeriesData {
  date: string;
  count: number;
}

export interface TrendsDashboardData {
  overview: OverallStats;
  topSkills: SkillTrend[];
  topLocations: LocationTrend[];
  topCompanies: CompanyTrend[];
  stipendDistribution: StipendDistribution[];
  durationDistribution: DurationDistribution[];
  timeSeriesData: TimeSeriesData[];
  lastUpdated: string;
}

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
