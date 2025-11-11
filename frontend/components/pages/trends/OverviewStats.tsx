import { BarChart3, Building2, Rocket, Clock, Home, IndianRupee } from "lucide-react";

import { OverallStats } from "@/lib/types/trends";

interface OverviewStatsProps {
  stats: OverallStats;
}

export const OverviewStats = ({ stats }: OverviewStatsProps) => {
  const formatGrowth = (growth: number) => {
    const sign = growth >= 0 ? "+" : "";
    return `${sign}${growth.toFixed(1)}%`;
  };

  const statCards = [
    {
      label: "Total Internships",
      value: stats.totalInternships.toLocaleString(),
      growth: stats.growthRate,
      icon: BarChart3,
    },
    {
      label: "Active Companies",
      value: stats.totalCompanies.toLocaleString(),
      icon: Building2,
    },
    {
      label: "Skills in Demand",
      value: stats.totalSkills.toLocaleString(),
      icon: Rocket,
    },
    {
      label: "Average Stipend",
      value: `₹${stats.avgStipend.toLocaleString()}`,
      icon: IndianRupee,
    },
    {
      label: "Average Duration",
      value: `${stats.avgDuration} months`,
      icon: Clock,
    },
    {
      label: "Remote Work",
      value: `${stats.remotePercentage.toFixed(1)}%`,
      icon: Home,
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 cursor-default">
      {statCards.map((stat, index) => {
        const IconComponent = stat.icon;
        return (
          <div
            key={index}
            className="bg-white p-6 rounded-xl border shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-gray-500">{stat.label}</div>
              <IconComponent className="h-5 w-5 text-blue-500" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
            {stat.growth !== undefined && (
              <div
                className={`text-sm font-medium ${
                  stat.growth >= 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {formatGrowth(stat.growth)}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
