import Image from "next/image";

import { InternshipDetail } from "@/lib/definitions";

import Building from "@/assets/building.png";

export const CompanyInfo = ({ company }: { company: InternshipDetail["company"] }) => {
  return (
    <div className="flex flex-col items-center w-full md:w-1/3 pt-14">
      <Image
        src={company.logoUrl || Building}
        alt={company.name ?? "company-logo"}
        width={100}
        height={100}
      />
      <h5 className="font-semibold text-2xl text-center mt-5 px-3">{company.name}</h5>
      <div className="flex flex-col mt-5 mb-10">
        <div className="flex flex-row justify-between">
          <p className="text-[#464646] text-xl">Hiring Since:</p>
          <span className="ml-8 text-black font-semibold">{company.hiringSince}</span>
        </div>
        <div className="flex flex-row mt-2 justify-between">
          <p className="text-[#464646] text-xl">Candidates Hired:</p>
          <span className="ml-8 text-black font-semibold">{company.candidatesHired}</span>
        </div>
      </div>
    </div>
  );
};
