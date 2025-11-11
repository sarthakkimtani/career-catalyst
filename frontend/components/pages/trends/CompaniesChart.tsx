import { Building2 } from "lucide-react";

import { CompanyTrend } from "@/lib/types/trends";

interface CompaniesChartProps {
  companies: CompanyTrend[];
}

export const CompaniesChart = ({ companies }: CompaniesChartProps) => {
  const topCompanies = companies.slice(0, 8);
  const maxCount = Math.max(...topCompanies.map((company) => company.count));

  return (
    <div className="bg-white p-6 rounded-xl border shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Most Active Companies</h3>
        <Building2 className="h-5 w-5 text-blue-500" />
      </div>

      <div className="space-y-4">
        {topCompanies.map((company, index) => (
          <div key={company.label} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0 w-6 text-sm font-medium text-gray-500">
                  #{index + 1}
                </div>
                <div className="font-medium text-gray-900">{company.label}</div>
              </div>

              <div className="text-sm font-medium text-gray-900">{company.count} openings</div>
            </div>

            <div className="ml-9">
              <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                <div
                  className="bg-purple-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(company.count / maxCount) * 100}%` }}
                ></div>
              </div>

              <div className="flex items-center justify-between text-xs text-gray-600">
                <span>Avg Stipend: ₹{company.avgStipend.toLocaleString()}</span>
                <span>Hiring since: {company.hiringSince}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 text-xs text-gray-500 text-center">
        Showing top {topCompanies.length} companies
      </div>
    </div>
  );
};
