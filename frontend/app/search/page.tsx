import { Suspense } from "react";

import { FilterSection } from "@/components/pages/search/FilterSection";
import { InternshipsGrid } from "@/components/pages/search/InternshipsGrid";
import { GridShimmer } from "@/components/pages/search/GridShimmer";

export const metadata = {
  title: "CareerCatalyst - Search Internships",
};

export default async function Search({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  return (
    <div className="flex flex-row justify-start w-full">
      <FilterSection />
      <Suspense fallback={<GridShimmer />}>
        <InternshipsGrid params={await searchParams} />
      </Suspense>
    </div>
  );
}
