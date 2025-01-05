"use client";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

import { Button } from "@/components/ui/Button";

export const SearchBar = () => {
  const router = useRouter();

  const popularTags = [
    "Frontend Development",
    "Backend Development",
    "Full-stack Development",
    "Machine Learning",
  ];

  return (
    <>
      <div className="flex flex-row items-center h-20 w-11/12 md:w-10/12 lg:w-3/5 px-5 mt-12 rounded-full bg-white">
        <Search className="hidden md:block" color="gray" />
        <input
          className="w-10/12 h-5/6 px-5 text-black text-lg border-none outline-none focus:outline-none focus:ring-0"
          placeholder="Find internships..."
        />
        <Button className="md:w-2/12" onClick={() => router.push("/search")}>
          <Search className="md:hidden" />
          <span className="hidden md:block">Search</span>
        </Button>
      </div>
      <div className="mt-6 flex flex-wrap gap-2 justify-center">
        {popularTags.map((tag) => (
          <button
            key={tag}
            className="px-4 py-1 bg-white/10 text-white rounded-full hover:bg-white/20 transition text-sm md:text-base"
          >
            {tag}
          </button>
        ))}
      </div>
    </>
  );
};
