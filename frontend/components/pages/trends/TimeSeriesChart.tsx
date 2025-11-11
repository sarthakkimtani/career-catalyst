import { TrendingUp } from "lucide-react";

import { TimeSeriesData } from "@/lib/types/trends";

interface TimeSeriesChartProps {
  data: TimeSeriesData[];
}

export const TimeSeriesChart = ({ data }: TimeSeriesChartProps) => {
  const maxCount = Math.max(...data.map((item) => item.count));
  const minCount = Math.min(...data.map((item) => item.count));

  const getBarHeight = (count: number) => {
    if (maxCount === minCount) return 50; // Default height if all values are same
    return ((count - minCount) / (maxCount - minCount)) * 200 + 20; // 20px minimum height
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  // Show only last 30 data points for better visualization
  const displayData = data.slice(-30);

  return (
    <div className="bg-white p-6 rounded-xl border shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Posting Trends Over Time</h3>
        <TrendingUp className="h-5 w-5 text-blue-500" />
      </div>

      {displayData.length > 0 ? (
        <div className="space-y-4">
          <div className="flex items-end justify-between space-x-1 h-64 overflow-x-auto">
            {displayData.map((item, index) => (
              <div
                key={item.date}
                className="flex flex-col items-center space-y-1 flex-shrink-0"
                style={{ minWidth: "30px" }}
              >
                <div className="relative group">
                  <div
                    className="bg-gradient-to-t from-blue-500 to-blue-300 rounded-t transition-all duration-300 hover:from-blue-600 hover:to-blue-400"
                    style={{
                      height: `${getBarHeight(item.count)}px`,
                      width: "20px",
                    }}
                  ></div>

                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
                    {item.count} jobs on {formatDate(item.date)}
                  </div>
                </div>

                {index % 5 === 0 && (
                  <div className="text-xs text-gray-500 transform -rotate-45 mt-2">
                    {formatDate(item.date)}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between text-sm text-gray-600 pt-4 border-t">
            <span>Min: {minCount}</span>
            <span>Max: {maxCount}</span>
            <span>
              Avg: {Math.round(data.reduce((sum, item) => sum + item.count, 0) / data.length)}
            </span>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-64 text-gray-500">
          <div className="text-center">
            <div className="text-4xl mb-2">📊</div>
            <div>No time series data available</div>
          </div>
        </div>
      )}

      <div className="mt-4 text-xs text-gray-500 text-center">Showing posting trends over time</div>
    </div>
  );
};
