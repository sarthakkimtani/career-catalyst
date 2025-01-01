"use client";

import Image from "next/image";

import { authClient } from "@/lib/auth-client";
import { cn } from "@/utils/cn";

import Google from "@/assets/brands/google.svg";
import Github from "@/assets/brands/github.svg";
import { useState } from "react";

interface AuthButtonProps {
  variant: "google" | "github";
  className?: string;
}

export const AuthButton = ({ className, variant }: AuthButtonProps) => {
  const [disabled, setDisabled] = useState<boolean>(false);

  const handleAuth = async () => {
    try {
      setDisabled(true);
      await authClient.signIn.social({
        provider: variant,
        callbackURL: `${window.location.origin}/search`,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button
      className={cn(
        "flex flex-row items-center justify-center w-72 h-12 font-medium font-xl border rounded-xl border-gray-300 transition duration-150 hover:bg-gray-100 disabled:bg-gray-200",
        className ?? ""
      )}
      disabled={disabled}
      onClick={handleAuth}
    >
      <Image
        className="mr-3"
        width={20}
        src={variant === "google" ? Google : Github}
        draggable={false}
        alt="icon"
      />
      Continue with {variant === "google" ? "Google" : "GitHub"}
    </button>
  );
};
