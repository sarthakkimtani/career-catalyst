"use client";

import Image, { StaticImageData } from "next/image";
import { motion } from "motion/react";

interface BrandImageProps {
  src: StaticImageData;
  href: string;
}

export const BrandImage = ({ src, href }: BrandImageProps) => {
  return (
    <motion.a
      className="mb-5 md:mb-0"
      href={href}
      target="_blank"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
    >
      <Image
        className="w-48 mt-5 grayscale transition duration-100 ease-in-out hover:grayscale-0"
        src={src}
        alt="brand-logo"
      />
    </motion.a>
  );
};
