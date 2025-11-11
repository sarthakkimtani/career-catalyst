export const TrendsLoading = () => {
  return (
    <div className="space-y-8">
      {/* Overview Stats Loading */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="bg-white p-6 rounded-xl border shadow-sm animate-pulse">
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-8 bg-gray-200 rounded mb-1"></div>
            <div className="h-3 bg-gray-200 rounded w-16"></div>
          </div>
        ))}
      </div>

      {/* Filters Loading */}
      <div className="bg-white p-4 rounded-xl border animate-pulse">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="h-4 bg-gray-200 rounded mb-2 w-20"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
          </div>
          <div className="flex-1">
            <div className="h-4 bg-gray-200 rounded mb-2 w-24"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>

      {/* Charts Loading */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="bg-white p-6 rounded-xl border animate-pulse">
            <div className="h-6 bg-gray-200 rounded mb-4 w-32"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>

      {/* Time Series Loading */}
      <div className="bg-white p-6 rounded-xl border animate-pulse">
        <div className="h-6 bg-gray-200 rounded mb-4 w-40"></div>
        <div className="h-80 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
};
