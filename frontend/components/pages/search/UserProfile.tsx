"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image, { StaticImageData } from "next/image";
import { AnimatePresence, motion } from "motion/react";

import { authClient } from "@/lib/auth-client";
import { useClickOutside } from "@/hooks/useClickOutside";

export const UserProfile = ({ userImage }: { userImage: string | StaticImageData }) => {
  const router = useRouter();
  const [isPopoverOpen, setPopoverOpen] = useState(false);

  const popoverRef = useRef<HTMLDivElement | null>(null);
  useClickOutside(popoverRef, () => setPopoverOpen(false));

  const togglePopover = () => setPopoverOpen((prev) => !prev);
  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => router.push("/auth"),
      },
    });
    setPopoverOpen(false);
  };

  return (
    <div className="relative" ref={popoverRef} onClick={togglePopover}>
      <div className="flex flex-row justify-end">
        <Image
          src={userImage}
          width={40}
          height={40}
          className="rounded-full cursor-pointer"
          alt="user"
        />
      </div>
      <AnimatePresence>
        {isPopoverOpen && (
          <motion.div
            key="motion-popover"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.1 }}
            className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg p-4"
          >
            <button
              onClick={handleSignOut}
              className="w-full text-center text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-150 ease-linear bg-red-500 hover:bg-red-700"
            >
              Sign Out
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
