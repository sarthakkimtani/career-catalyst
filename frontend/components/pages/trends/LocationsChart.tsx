import { MapPin } from "lucide-react";

import { LocationTrend } from "@/lib/types/trends";

interface LocationsChartProps {
  locations: LocationTrend[];
}

export const LocationsChart = ({ locations }: LocationsChartProps) => {
  const topLocations = locations.slice(0, 8);
  const maxCount = Math.max(...topLocations.map((location) => location.count));

  return (
    <div className="bg-white p-6 rounded-xl border shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Top Hiring Locations</h3>
        <MapPin className="h-5 w-5 text-blue-500" />
      </div>

      <div className="space-y-4">
        {topLocations.map((location, index) => (
          <div key={location.label} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0 w-6 text-sm font-medium text-gray-500">
                  #{index + 1}
                </div>
                <div className="font-medium text-gray-900">{location.label}</div>
              </div>

              <div className="text-sm font-medium text-gray-900">{location.count} jobs</div>
            </div>

            <div className="ml-9">
              <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                <div
                  className="bg-green-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(location.count / maxCount) * 100}%` }}
                ></div>
              </div>

              <div className="flex items-center justify-between text-xs text-gray-600">
                <span>Avg Stipend: ₹{location.avgStipend.toLocaleString()}</span>
                <span>Avg Duration: {location.avgDuration} months</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 text-xs text-gray-500 text-center">
        Showing top {topLocations.length} locations
      </div>
    </div>
  );
};
