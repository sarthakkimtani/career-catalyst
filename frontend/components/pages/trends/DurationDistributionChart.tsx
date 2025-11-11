import { Clock } from "lucide-react";

import { DurationDistribution } from "@/lib/types/trends";

interface DurationDistributionProps {
  distribution: DurationDistribution[];
}

export const DurationDistributionChart = ({ distribution }: DurationDistributionProps) => {
  const maxPercentage = Math.max(...distribution.map((item) => item.percentage));

  return (
    <div className="bg-white p-6 rounded-xl border shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Duration Distribution</h3>
        <Clock className="h-5 w-5 text-blue-500" />
      </div>

      <div className="space-y-4">
        {distribution.map((item) => (
          <div key={item.range} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="font-medium text-gray-900">{item.range}</div>
              <div className="text-sm text-gray-600">
                {item.count} ({item.percentage.toFixed(1)}%)
              </div>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-blue-400 to-indigo-500 h-3 rounded-full transition-all duration-300"
                style={{ width: `${(item.percentage / maxPercentage) * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 text-xs text-gray-500 text-center">
        Distribution based on internship duration
      </div>
    </div>
  );
};
