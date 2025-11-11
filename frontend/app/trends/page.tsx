import { Suspense } from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { TrendsDashboard } from "@/components/pages/trends/TrendsDashboard";
import { TrendsLoading } from "@/components/pages/trends/TrendsLoading";
import { NavSearch } from "@/components/common/NavSearch";
import { Footer } from "@/components/layout/Footer";

import { getSession } from "@/lib/session";

import Avatar from "@/assets/avatar.jpg";

export const metadata = {
  title: "CareerCatalyst - Industry Trends",
};

export default async function TrendsPage({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { data: auth } = await getSession(await headers());
  if (!auth) redirect("/auth?redirect=trends");

  return (
    <>
      <NavSearch avatar={auth.user.image ?? Avatar} searchEnabled={false} />
      <div className="flex flex-col w-[98%] py-8 px-6 lg:p-10 m-[1%] rounded-2xl bg-gray-50">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Industry Trends</h1>
          <p className="text-lg text-gray-600">
            Real-time insights into internship market trends and opportunities
          </p>
        </div>
        <Suspense fallback={<TrendsLoading />}>
          <TrendsDashboard searchParams={await searchParams} />
        </Suspense>
      </div>
      <Footer />
    </>
  );
}
