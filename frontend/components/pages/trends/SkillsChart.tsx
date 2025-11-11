import { Code } from "lucide-react";

import { SkillTrend } from "@/lib/types/trends";

interface SkillsChartProps {
  skills: SkillTrend[];
}

export const SkillsChart = ({ skills }: SkillsChartProps) => {
  const topSkills = skills.slice(0, 10);
  const maxCount = Math.max(...topSkills.map((skill) => skill.count));

  return (
    <div className="bg-white p-6 rounded-xl border shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Top Skills in Demand</h3>
        <Code className="h-5 w-5 text-blue-500" />
      </div>

      <div className="space-y-4">
        {topSkills.map((skill, index) => (
          <div key={skill.label} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0 w-6 text-sm font-medium text-gray-500">
                #{index + 1}
              </div>
              <div className="font-medium text-gray-900">{skill.label}</div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-32 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(skill.count / maxCount) * 100}%` }}
                ></div>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-900">{skill.count}</span>
                {skill.growth !== undefined && (
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded-full ${
                      skill.growth >= 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                    }`}
                  >
                    {skill.growth >= 0 ? "+" : ""}
                    {skill.growth.toFixed(1)}%
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 text-xs text-gray-500 text-center">
        Showing top {topSkills.length} skills
      </div>
    </div>
  );
};
