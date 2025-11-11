import { fetchWrapper } from "@/lib/fetch-wrapper";
import {
  TrendsDashboardData,
  TrendPeriod,
  SkillTrend,
  LocationTrend,
  CompanyTrend,
  OverallStats,
} from "@/lib/types/trends";

export const fetchTrendsDashboard = async (
  cookie: string,
  period: TrendPeriod = TrendPeriod.ALL_TIME,
  location?: string
) => {
  try {
    const params = new URLSearchParams({ period });
    if (location) params.append("location", location);

    const response = await fetchWrapper(`/trends/dashboard?${params}`, cookie, 300);
    if (!response.ok) {
      return { data: null, error: "Failed to fetch trends data" };
    }

    const data: TrendsDashboardData = await response.json();
    return { data, error: null };
  } catch (error) {
    return { data: null, error: (error as Error).message };
  }
};

export const fetchTopSkills = async (
  cookie: string,
  period: TrendPeriod = TrendPeriod.ALL_TIME,
  location?: string
) => {
  try {
    const params = new URLSearchParams({ period });
    if (location) params.append("location", location);

    const response = await fetchWrapper(`/trends/skills?${params}`, cookie, 300);
    if (!response.ok) {
      return { data: null, error: "Failed to fetch skills data" };
    }

    const data: SkillTrend[] = await response.json();
    return { data, error: null };
  } catch (error) {
    return { data: null, error: (error as Error).message };
  }
};

export const fetchTopLocations = async (
  cookie: string,
  period: TrendPeriod = TrendPeriod.ALL_TIME
) => {
  try {
    const params = new URLSearchParams({ period });

    const response = await fetchWrapper(`/trends/locations?${params}`, cookie, 300);
    if (!response.ok) {
      return { data: null, error: "Failed to fetch locations data" };
    }

    const data: LocationTrend[] = await response.json();
    return { data, error: null };
  } catch (error) {
    return { data: null, error: (error as Error).message };
  }
};

export const fetchTopCompanies = async (
  cookie: string,
  period: TrendPeriod = TrendPeriod.ALL_TIME,
  location?: string
) => {
  try {
    const params = new URLSearchParams({ period });
    if (location) params.append("location", location);

    const response = await fetchWrapper(`/trends/companies?${params}`, cookie, 300);
    if (!response.ok) {
      return { data: null, error: "Failed to fetch companies data" };
    }

    const data: CompanyTrend[] = await response.json();
    return { data, error: null };
  } catch (error) {
    return { data: null, error: (error as Error).message };
  }
};

export const fetchOverallStats = async (
  cookie: string,
  period: TrendPeriod = TrendPeriod.ALL_TIME,
  location?: string
) => {
  try {
    const params = new URLSearchParams({ period });
    if (location) params.append("location", location);

    const response = await fetchWrapper(`/trends/overview?${params}`, cookie, 300);
    if (!response.ok) {
      return { data: null, error: "Failed to fetch overview data" };
    }

    const data: OverallStats = await response.json();
    return { data, error: null };
  } catch (error) {
    return { data: null, error: (error as Error).message };
  }
};
