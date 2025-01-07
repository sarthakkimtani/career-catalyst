import { cookies } from "next/headers";

import { InternshipCard } from "@/components/pages/search/InternshipCard";

import { filterInternships } from "@/utils/filterInternships";
import { fetchInternships } from "@/lib/api";

export const InternshipsGrid = async ({
  params,
}: {
  params: { [key: string]: string | string[] | undefined } | undefined;
}) => {
  const internships = await fetchInternships((await cookies()).toString());
  const filteredInternships = internships.filter((internship) =>
    filterInternships(internship, params)
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 p-8 w-full border-l border-gray-300">
      {filteredInternships.map((item, index) => (
        <InternshipCard data={item} key={index} />
      ))}
    </div>
  );
};
