"use client";

import { motion } from "motion/react";
import { MoveDown } from "lucide-react";

export const Hero = () => {
  return (
    <div className="flex flex-col items-center w-[98%] pt-56 bg-gradient-to-r from-[#6D28D9] to-[#9D7FEA] rounded-2xl text-white pb-32">
      <h1 className="text-3xl px-2 md:px-0 md:text-5xl lg:text-7xl text-center font-bold">
        Frequently Asked Questions
      </h1>
      <p className="mt-5 text-lg px-2 md:px-0 md:text-xl lg:text-2xl text-center">
        Find quick answers to the most common questions and get the support you need.
      </p>
      <motion.a
        href="#select"
        className="cursor-pointer"
        animate={{ y: [0, -20, 0] }}
        transition={{
          duration: 1.3,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut",
        }}
      >
        <MoveDown strokeWidth={1.25} size={60} className="my-20 text-white" />
      </motion.a>
    </div>
  );
};
