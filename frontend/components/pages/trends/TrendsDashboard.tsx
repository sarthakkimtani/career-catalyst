import { cookies } from "next/headers";
import { AlertTriangle, BarChart3, Clock, RefreshCw } from "lucide-react";

import { fetchTrendsDashboard } from "@/lib/api/trends";
import { TrendPeriod } from "@/lib/types/trends";
import { OverviewStats } from "./OverviewStats";
import { SkillsChart } from "./SkillsChart";
import { LocationsChart } from "./LocationsChart";
import { CompaniesChart } from "./CompaniesChart";
import { StipendDistributionChart } from "./StipendDistributionChart";
import { DurationDistributionChart } from "./DurationDistributionChart";
import { TimeSeriesChart } from "./TimeSeriesChart";

interface TrendsDashboardProps {
  searchParams?: {
    period?: string;
    location?: string;
  };
}

export const TrendsDashboard = async ({ searchParams }: TrendsDashboardProps) => {
  const cookie = (await cookies()).toString();

  // Get initial period and location from searchParams
  const initialPeriod =
    searchParams?.period && Object.values(TrendPeriod).includes(searchParams.period as TrendPeriod)
      ? (searchParams.period as TrendPeriod)
      : TrendPeriod.ALL_TIME; // Changed default to ALL_TIME for testing

  const initialLocation =
    searchParams?.location && typeof searchParams.location === "string"
      ? searchParams.location
      : "";

  // Fetch initial data
  const { data, error } = await fetchTrendsDashboard(
    cookie,
    initialPeriod,
    initialLocation || undefined
  );

  if (error) {
    return (
      <div className="bg-white p-8 rounded-xl border shadow-sm text-center">
        <div className="flex justify-center mb-4">
          <AlertTriangle className="h-12 w-12 text-red-500" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Error Loading Trends</h3>
        <p className="text-gray-600 mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          <RefreshCw className="h-4 w-4" />
          Retry
        </button>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="bg-white p-8 rounded-xl border shadow-sm text-center">
        <div className="flex justify-center mb-4">
          <BarChart3 className="h-12 w-12 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No Data Available</h3>
        <p className="text-gray-600">No trends data found for the selected criteria.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <OverviewStats stats={data.overview} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <SkillsChart skills={data.topSkills} />
        <LocationsChart locations={data.topLocations} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <CompaniesChart companies={data.topCompanies} />
        <StipendDistributionChart distribution={data.stipendDistribution} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <DurationDistributionChart distribution={data.durationDistribution} />
        <TimeSeriesChart data={data.timeSeriesData} />
      </div>

      <div className="text-sm text-gray-500 text-center bg-white p-4 rounded-xl border">
        <div className="flex items-center justify-center space-x-2">
          <Clock className="h-4 w-4" />
          <span>Last updated: {new Date(data.lastUpdated).toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};
