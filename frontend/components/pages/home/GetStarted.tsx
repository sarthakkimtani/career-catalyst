"use client";

import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { BadgePlus } from "lucide-react";

export const GetStarted = () => {
  const router = useRouter();

  return (
    <div
      className="flex flex-col items-center w-[98%] pt-10 bg-white rounded-2xl text-white mb-20"
      onClick={() => router.push("/search")}
    >
      <div className="h-36 mb-10 border-[0.5px] border-gray-300"></div>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex flex-row items-center justify-center p-8 bg-[#FFF8EF] cursor-pointer rounded-full shadow-lg transition-all duration-300 ease-in-out hover:shadow-xl"
      >
        <motion.div
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-center w-14 h-14 bg-[#FFC372] rounded-full text-black mr-4"
        >
          <BadgePlus size={24} />
        </motion.div>
        <h2 className="text-xl sm:text-2xl text-gray-800 font-medium text-center">
          Get Started Today
        </h2>
      </motion.div>
      <div className="h-36 mt-10 border-[0.5px] border-gray-300"></div>
    </div>
  );
};
