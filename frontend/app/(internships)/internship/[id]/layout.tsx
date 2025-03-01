import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { Footer } from "@/components/layout/Footer";
import { NavSearch } from "@/components/common/NavSearch";
import { getSession } from "@/lib/session";

import Avatar from "@/assets/avatar.jpg";

export const metadata = {
  title: "CareerCatalyst - Search Internships",
};

export default async function DetailLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const reqHeaders = await headers();
  const { data: auth } = await getSession(reqHeaders);
  if (!auth) redirect("/auth");

  return (
    <>
      <NavSearch avatar={auth.user.image ?? Avatar} searchEnabled={false} />
      {children}
      <Footer />
    </>
  );
}
