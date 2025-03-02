import { BrandImage } from "@/components/ui/BrandImage";

import Naukri from "@/assets/brands/naukri.png";
import AICTE from "@/assets/brands/AICTE.png";

export const BrandsList = () => {
  const platforms = [
    { logo: Naukri, url: "https://naukri.com" },
    { logo: AICTE, url: "https://internship.aicte-india.org/" },
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
