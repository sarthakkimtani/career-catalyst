"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Flame } from "lucide-react";
import { motion, useScroll, useMotionValueEvent } from "motion/react";

import { Button } from "@/components/ui/Button";
import Logo from "@/assets/alt-logo.svg";

const NavbarLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  return (
    <Link
      href={href}
      className="px-4 py-2 rounded-2xl font-medium cursor-pointer transition ease-in-out hover:bg-gray-200"
    >
      {children}
    </Link>
  );
};

export const Navbar = () => {
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();
  const router = useRouter();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  return (
    <motion.nav
      className="flex items-center justify-center fixed w-full top-0 z-50"
      animate={{
        y: hidden ? "-100%" : "0%",
      }}
      transition={{
        duration: 0.5,
        ease: [0.1, 0.25, 0.3, 1],
      }}
    >
      <motion.div
        className="flex flex-row w-11/12 sm:w-1/2 md:1/3 lg:w-1/3 items-center px-4 bg-white  h-20 rounded-full mt-12 drop-shadow-xl"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          ease: [0, 0.71, 0.2, 1.01],
          delay: 0.2,
        }}
      >
        <Link href="/">
          <Image className="w-16 h-16" src={Logo} alt="logo" />
        </Link>
        <div className="w-4/5 xl:w-1/2 flex flex-row justify-evenly">
          <NavbarLink href="/faq">FAQ</NavbarLink>
          <NavbarLink href="/search">Search</NavbarLink>
        </div>
        <div className="flex w-1/5 xl:w-[30%] xl:ml-8 justify-end">
          <Button className="xl:w-full" onClick={() => router.push("/trends")}>
            <Flame className="mr-1" />
            <span className="hidden lg:block">Trends</span>
          </Button>
        </div>
      </motion.div>
    </motion.nav>
  );
};
