import { Search } from "lucide-react";

import { Button } from "@/components/ui/Button";

export const Hero = () => {
  const popularTags = [
    "Frontend Development",
    "Backend Development",
    "Full-stack Development",
    "Machine Learning",
  ];

  return (
    <div className="flex flex-col items-center w-[98%] pt-48 bg-gradient-to-r from-[#0851C2] to-[#4FA3F7] rounded-2xl text-white pb-32 lg:h-screen">
      <h1 className="text-3xl px-2 md:px-0 md:text-5xl lg:text-7xl text-center font-bold">
        Accelerate Your Tech Career
      </h1>
      <p className="mt-5 text-lg px-2 md:px-0 md:text-xl lg:text-2xl text-center">
        Your go-to platform for internship discovery and career growth analysis.
      </p>
      <div className="flex flex-row items-center h-20 w-11/12 md:w-10/12 lg:w-3/5 px-5 mt-12 rounded-full bg-white">
        <Search className="hidden md:block" color="gray" />
        <input
          className="w-10/12 h-5/6 px-5 text-black text-lg outline-none"
          placeholder="Find internships..."
        />
        <Button className="md:w-2/12">
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
    </div>
  );
};
