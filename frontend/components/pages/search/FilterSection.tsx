import { ChevronDown } from "lucide-react";

import { SelectFilter } from "@/components/pages/search/SelectFilter";

export const FilterSection = () => {
  const durationValues = ["0-3 Months", "3-6 Months", "6+ Months"];
  const onsiteRemoteValues = ["Onsite", "Remote"];

  return (
    <section className="hidden lg:flex flex-col justify-start w-1/4 p-4">
      <div className="flex flex-row w-full justify-between px-8">
        <h6 className="text-xl font-semibold">Filters</h6>
        <ChevronDown size={24} color="#000" />
      </div>
      <SelectFilter title="Duration" values={durationValues} queryKey="duration" />
      <SelectFilter title="Onsite or Remote" values={onsiteRemoteValues} queryKey="mode" />
    </section>
  );
};
