import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { authClient } from "@/lib/auth-client";
import { SearchBar } from "@/components/pages/search/SearchBar";
import { FilterSection } from "@/components/pages/search/FilterSection";

import Avatar from "@/assets/avatar.jpg";

export const metadata = {
  title: "CareerCatalyst - Search Internships",
};

export default async function Search() {
  const { data } = await authClient.getSession({
    fetchOptions: {
      headers: await headers(),
    },
  });
  if (!data) {
    redirect("/auth");
  }

  return (
    <div className="flex flex-col w-full">
      <SearchBar userImage={data.user.image ?? Avatar} />
      <div className="flex flex-col justify-start w-full">
        <FilterSection />
      </div>
    </div>
  );
}
