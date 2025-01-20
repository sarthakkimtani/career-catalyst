import { cookies } from "next/headers";

import { InternshipCard } from "@/components/pages/search/InternshipCard";
import { EmptyStateBanner } from "@/components/pages/search/EmptyStateBanner";
import { ErrorBanner } from "@/components/pages/search/ErrorBanner";
import { Pagination } from "@/components/pages/search/Pagination";

import { createSearchParams } from "@/utils/createSearchParams";
import { fetchInternships } from "@/lib/api";

export const InternshipsGrid = async ({
  params,
}: {
  params: { [key: string]: string | string[] | undefined } | undefined;
}) => {
  const cookie = (await cookies()).toString();
  const searchParams = createSearchParams(params);
  const currentPage = Number(searchParams.get("page")) || 1;

  const { data, error } = await fetchInternships(cookie, searchParams);
  const internships = data?.internships;

  if (error) return <ErrorBanner message="An error occurred" />;
  if (internships?.length == 0) return <EmptyStateBanner />;

  return (
    <div className="flex flex-col w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 p-8 border-l border-gray-300">
        {internships?.map((item, index) => (
          <InternshipCard data={item} key={index} />
        ))}
      </div>
      <Pagination currentPage={currentPage} totalPages={data?.total} />
    </div>
  );
};
