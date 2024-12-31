"use client";

import { MouseEventHandler } from "react";
import { motion } from "motion/react";

interface ButtonProps {
  className: string | undefined;
  children: React.ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
}

export const Button = ({ className, children, onClick }: ButtonProps) => {
  return (
    <motion.button
      className={`flex items-center justify-center bg-black text-white p-4 text-md rounded-full ${className}`}
      whileHover={{
        backgroundColor: "rgb(30, 41, 59)",
        scale: 1.05,
      }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
};
