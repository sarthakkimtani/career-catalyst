import { headers } from "next/headers";

import { ErrorBanner } from "@/components/pages/search/ErrorBanner";
import { CompanyInfo } from "@/components/pages/internship/CompanyInfo";
import { InternshipDetailCard } from "@/components/pages/internship/InternshipDetailCard";

import { fetchInternshipById } from "@/lib/api";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
  const reqHeaders = await headers();

  const cookie = reqHeaders.get("Cookie") ?? "";
  const { data, error } = await fetchInternshipById(cookie, id);

  if (error) return <ErrorBanner message="An error occurred" />;

  return (
    <>
      <div className="flex flex-col md:flex-row w-[98%] m-[1%] bg-[#F0F6FC] rounded-2xl mt-5 shadow-md">
        <InternshipDetailCard internship={data!} />
        <CompanyInfo company={data!.company} />
      </div>
    </>
  );
}
