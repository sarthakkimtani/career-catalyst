import { BrandImage } from "@/components/ui/BrandImage";

import Internshala from "@/assets/brands/internshala.png";
import Linkedin from "@/assets/brands/linkedin.png";
import Indeed from "@/assets/brands/indeed.png";

export const BrandsList = () => {
  const platforms = [
    { logo: Internshala, url: "https://internshala.com" },
    { logo: Linkedin, url: "https://linkedin.com" },
    { logo: Indeed, url: "https://indeed.com" },
  ];

  return (
    <>
      <div className="h-36 mt-10 border-[0.5px] border-gray-300"></div>
      <div className="w-2/5 mb-10 border-[0.5px] border-gray-300"></div>
      <div className="flex flex-col items-center w-[98%] mt-6">
        <h2 className="text-3xl px-2 md:px-0 md:text-5xl md:leading-[65px] lg:text-6xl text-center font-semibold">
          Powered by Data from Leading Websites
        </h2>
        <div className="flex flex-col md:flex-row w-full items-center justify-evenly md:px-16 lg:px-44 mt-10">
          {platforms.map((platform, index) => (
            <BrandImage key={index} src={platform.logo} href={platform.url} />
          ))}
        </div>
      </div>
      <div className="w-2/5 mt-10 border-[0.5px] border-gray-300"></div>
      <div className="h-36 mb-10 border-[0.5px] border-gray-300"></div>
    </>
  );
};
