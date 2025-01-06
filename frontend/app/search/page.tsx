import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { SearchBar } from "@/components/pages/search/SearchBar";
import { FilterSection } from "@/components/pages/search/FilterSection";
import { InternshipsGrid } from "@/components/pages/search/InternshipsGrid";
import { Footer } from "@/components/layout/Footer";

import { fetchInternships } from "@/lib/api";
import { getSession } from "@/lib/session";

import Avatar from "@/assets/avatar.jpg";

export const metadata = {
  title: "CareerCatalyst - Search Internships",
};

export default async function Search() {
  const reqHeaders = await headers();

  const { data } = await getSession(reqHeaders);
  if (!data) redirect("/auth");

  const internships = await fetchInternships(reqHeaders.get("cookie"));

  return (
    <>
      <SearchBar userImage={data.user.image ?? Avatar} />
      <div className="flex flex-row justify-start w-full">
        <FilterSection />
        <InternshipsGrid data={internships} />
      </div>
      <Footer />
    </>
  );
}
