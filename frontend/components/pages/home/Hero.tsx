import { SearchBar } from "@/components/pages/home/SearchBar";

export const Hero = () => {
  return (
    <div className="flex flex-col items-center w-[98%] pt-48 bg-gradient-to-r from-[#0851C2] to-[#4FA3F7] rounded-2xl text-white pb-32 lg:h-screen">
      <h1 className="text-3xl px-2 md:px-0 md:text-5xl lg:text-7xl text-center font-bold">
        Accelerate Your Tech Career
      </h1>
      <p className="mt-5 text-lg px-2 md:px-0 md:text-xl lg:text-2xl text-center">
        Your go-to platform for internship discovery and career growth analysis.
      </p>
      <SearchBar />
    </div>
  );
};
