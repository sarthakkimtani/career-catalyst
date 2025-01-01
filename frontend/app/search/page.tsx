import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { authClient } from "@/lib/auth-client";
import { SearchBar } from "@/components/pages/search/SearchBar";

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

  // TODO: Add skeleton avatar if image is not available
  return (
    <div className="flex flex-col w-full">
      <SearchBar userImage={data.user.image!} />
    </div>
  );
}
