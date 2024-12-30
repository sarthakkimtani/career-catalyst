import type { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Image from "next/image";

import { AuthButton } from "@/components/pages/auth/AuthButton";
import { AuthVisual } from "@/components/pages/auth/AuthVisual";
import { axiosInstance } from "@/lib/axios";

import Logo from "@/assets/logo.svg";

export const metadata: Metadata = {
  title: "CareerCatalyst - Login or Signup",
};

const redirectIfAuthenticated = async () => {
  const reqHeaders = await headers();
  const response = await axiosInstance.get("/me", {
    headers: {
      Cookie: reqHeaders.get("cookie"),
    },
  });
  if (response.data) {
    redirect("/search");
  }
};

export default async function Auth() {
  await redirectIfAuthenticated();

  return (
    <section>
      <div className="flex flex-row w-full h-screen items-center justify-center">
        <div className="flex flex-col items-center justify-center w-full lg:w-1/2 h-full">
          <Image className="w-20 mb-6" src={Logo} draggable={false} alt="Logo" />
          <h5 className="font-medium text-2xl">Login or Signup to use CareerCatalyst</h5>
          <p className="text-[#6B7280] text-xl mt-2">Choose your preferred sign in method</p>
          <AuthButton variant="google" className="mt-8 mb-3" />
          <AuthButton variant="github" />
        </div>
        <AuthVisual />
      </div>
    </section>
  );
}
