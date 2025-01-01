import Link from "next/link";
import Image from "next/image";
import { CircleDollarSign, MapPinIcon, SearchIcon } from "lucide-react";

import { FilterField } from "@/components/pages/search/FilterField";

import Logo from "@/assets/white-logo.svg";

const SearchLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  return (
    <Link
      href={href}
      className="px-4 py-2 rounded-2xl font-medium cursor-pointer text-white transition ease-in-out hover:bg-gray-900"
    >
      {children}
    </Link>
  );
};

export const SearchBar = ({ userImage }: { userImage: string }) => {
  return (
    <div className="flex flex-col w-[98%] p-10 bg-black text-white m-[1%] rounded-2xl">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row w-1/4 items-center justify-start">
          <Image className="w-10 cursor-pointer" src={Logo} draggable={false} alt="Logo" />
          <h3 className="text-xl font-semibold ml-4">CareerCatalyst</h3>
        </div>
        <div className="hidden lg:flex flex-row w-1/2 justify-center items-center">
          <SearchLink href="/">Features</SearchLink>
          <SearchLink href="/trends">Trends</SearchLink>
          <SearchLink href="/faq">FAQ</SearchLink>
        </div>
        <div className="flex flex-row w-1/4 justify-end">
          <Image
            src={userImage}
            width={40}
            height={40}
            className="rounded-full cursor-pointer"
            alt="user"
          />
        </div>
      </div>
      <div className="flex flex-col lg:flex-row items-center justify-center mt-14 space-y-6 lg:space-y-0 lg:space-x-6">
        <FilterField
          icon={<SearchIcon size={18} color="#4B5563" />}
          placeholder="Search Roles..."
        />
        <FilterField
          icon={<MapPinIcon size={18} color="#4B5563" />}
          placeholder="Enter Location..."
        />
        <FilterField
          icon={<CircleDollarSign size={18} color="#4B5563" />}
          placeholder="Desired Stipend..."
        />
      </div>
    </div>
  );
};
