import { Suspense } from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { FilterSection } from "@/components/pages/search/FilterSection";
import { InternshipsGrid } from "@/components/pages/search/InternshipsGrid";
import { GridShimmer } from "@/components/pages/search/GridShimmer";
import { NavSearch } from "@/components/common/NavSearch";

import { getSession } from "@/lib/session";

import Avatar from "@/assets/avatar.jpg";

export default async function Search({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { data: auth } = await getSession(await headers());
  if (!auth) redirect("/auth");

  return (
    <>
      <NavSearch avatar={auth.user.image ?? Avatar} searchEnabled />
      <div className="flex flex-row justify-start w-full">
        <FilterSection />
        <Suspense fallback={<GridShimmer />}>
          <InternshipsGrid params={await searchParams} />
        </Suspense>
      </div>
    </>
  );
}
