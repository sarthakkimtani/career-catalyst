import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { Footer } from "@/components/layout/Footer";
import { SearchBar } from "@/components/pages/search/SearchBar";
import { getSession } from "@/lib/session";

import Avatar from "@/assets/avatar.jpg";

export const metadata = {
  title: "CareerCatalyst - Search Internships",
};

export default async function SearchLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data } = await getSession(await headers());
  if (!data) redirect("/auth");

  return (
    <>
      <SearchBar userImage={data.user.image ?? Avatar} />
      {children}
      <Footer />
    </>
  );
}
