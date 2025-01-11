import { cookies } from "next/headers";

import { InternshipCard } from "@/components/pages/search/InternshipCard";
import { EmptyStateBanner } from "@/components/pages/search/EmptyStateBanner";
import { ErrorBanner } from "@/components/pages/search/ErrorBanner";

import { filterInternships } from "@/utils/filterInternships";
import { fetchInternships } from "@/lib/api";

export const InternshipsGrid = async ({
  params,
}: {
  params: { [key: string]: string | string[] | undefined } | undefined;
}) => {
  const { data, error } = await fetchInternships((await cookies()).toString());
  const filteredInternships = (data || []).filter((internship) =>
    filterInternships(internship, params)
  );

  if (error) return <ErrorBanner message="An error occurred" />;
  if (filteredInternships.length == 0) return <EmptyStateBanner />;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 p-8 w-full border-l border-gray-300">
      {filteredInternships.map((item, index) => (
        <InternshipCard data={item} key={index} />
      ))}
    </div>
  );
};
