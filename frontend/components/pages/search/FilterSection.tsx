import { ChevronDown } from "lucide-react";

import { SelectFilter } from "@/components/pages/search/SelectFilter";

export const FilterSection = () => {
  const skillValues = [
    { name: "Python", count: 53 },
    { name: "Java", count: 34 },
    { name: "TypeScript", count: 71 },
  ];
  const durationValues = [
    { name: "0-3 Months", count: 53 },
    { name: "3-6 Months", count: 34 },
    { name: "6+ Months", count: 71 },
  ];

  return (
    <section className="hidden lg:flex flex-col justify-start w-1/4 p-4">
      <div className="flex flex-row w-full justify-between px-8">
        <h6 className="text-xl font-semibold">Filters</h6>
        <ChevronDown size={24} color="#000" />
      </div>
      <SelectFilter title="Skills" values={skillValues} />
      <SelectFilter title="Duration" values={durationValues} />
    </section>
  );
};
