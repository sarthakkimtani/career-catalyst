import { TrendPeriod } from "@/lib/types/trends";

interface TrendFiltersProps {
  period: TrendPeriod;
  setPeriod: (period: TrendPeriod) => void;
  location: string;
  setLocation: (location: string) => void;
}

export const TrendFilters = ({ period, setPeriod, location, setLocation }: TrendFiltersProps) => {
  const periodOptions = [
    { value: TrendPeriod.LAST_7_DAYS, label: "Last 7 Days" },
    { value: TrendPeriod.LAST_30_DAYS, label: "Last 30 Days" },
    { value: TrendPeriod.LAST_3_MONTHS, label: "Last 3 Months" },
    { value: TrendPeriod.LAST_6_MONTHS, label: "Last 6 Months" },
    { value: TrendPeriod.LAST_YEAR, label: "Last Year" },
    { value: TrendPeriod.ALL_TIME, label: "All Time" },
  ];

  return (
    <div className="flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-xl border shadow-sm">
      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700 mb-2">Time Period</label>
        <select
          value={period}
          onChange={(e) => setPeriod(e.target.value as TrendPeriod)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
        >
          {periodOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700 mb-2">Location Filter</label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter city or 'Work from home'"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
    </div>
  );
};
