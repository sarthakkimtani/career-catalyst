import Image from "next/image";
import Link from "next/link";

import WhiteLogo from "@/assets/white-logo.svg";
import FbIcon from "@/assets/brands/facebook.svg";
import XIcon from "@/assets/brands/x.svg";
import LinkedInIcon from "@/assets/brands/linkedin.svg";

const FooterLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  return (
    <Link
      href={href}
      className="px-4 py-2 rounded-2xl font-medium cursor-pointer text-white transition ease-in-out hover:bg-gray-800"
    >
      {children}
    </Link>
  );
};

export const Footer = () => {
  return (
    <footer className="flex flex-col items-center justify-center mt-4">
      <div className="bg-black w-[98%] flex flex-col items-center rounded-2xl mb-4">
        <div className="flex flex-row items-center mt-12">
          <Image className="w-12 h-8" src={WhiteLogo} alt="white-logo" />
          <p className="text-lg text-white font-medium ml-4">CareerCatalyst</p>
        </div>
        <div className="flex flex-row items-center mt-8">
          <FooterLink href="/faq">FAQ</FooterLink>
          <FooterLink href="/search">Search</FooterLink>
          <FooterLink href="/trends">Trends</FooterLink>
        </div>
        <div className="flex flex-row items-center mt-6">
          <Image className="w-6 cursor-pointer" src={LinkedInIcon} alt="linkedin" />
          <Image className="w-6 ml-4 cursor-pointer" src={XIcon} alt="x-logo" />
          <Image className="w-6 ml-4 cursor-pointer" src={FbIcon} alt="facebook" />
        </div>
        <div className="w-full border-[0.5px] border-gray-700 mt-10" />
        <span className="text-md text-gray-500 my-5">
          &copy; {new Date().getFullYear()}, All Rights Reserved
        </span>
      </div>
    </footer>
  );
};
