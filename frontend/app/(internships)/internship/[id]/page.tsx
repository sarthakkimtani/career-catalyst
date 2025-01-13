import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { ErrorBanner } from "@/components/pages/search/ErrorBanner";
import { NavSearch } from "@/components/common/NavSearch";
import { CompanyInfo } from "@/components/pages/internship/CompanyInfo";
import { InternshipDetailCard } from "@/components/pages/internship/InternshipDetailCard";

import { getSession } from "@/lib/session";
import { fetchInternshipById } from "@/lib/api";

import Avatar from "@/assets/avatar.jpg";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const reqHeaders = await headers();
  const { data: auth } = await getSession(reqHeaders);
  if (!auth) redirect("/auth");

  const id = (await params).id;
  const cookie = reqHeaders.get("Cookie") ?? "";
  const { data, error } = await fetchInternshipById(cookie, id);

  if (error) return <ErrorBanner message="An error occurred" />;

  return (
    <>
      <NavSearch avatar={auth.user.image ?? Avatar} searchEnabled={false} />
      <div className="flex flex-col md:flex-row w-[98%] m-[1%] bg-[#F0F6FC] rounded-2xl mt-5 shadow-md">
        <InternshipDetailCard internship={data!} />
        <CompanyInfo company={data!.company} />
      </div>
    </>
  );
}
