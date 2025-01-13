import { Banknote, Clock3, MapPin } from "lucide-react";

import { Button } from "@/components/ui/Button";

import { InternshipDetail } from "@/lib/definitions";

export const InternshipDetailCard = ({ internship }: { internship: InternshipDetail }) => {
  return (
    <div className="flex flex-col w-full md:w-2/3 border-b md:border-r border-gray-300">
      <div className="flex flex-row items-center justify-between border-b border-gray-300 p-4 md:p-8">
        <div className="flex flex-col">
          <h2 className="font-semibold text-2xl md:text-4xl pb-1">{internship?.title}</h2>
          <h6 className="text-[#464646] text-md">{internship?.company.name}</h6>
        </div>
        <Button className="text-md md:text-lg">Apply Now</Button>
      </div>
      <div className="flex flex-row items-center justify-center md:justify-start px-4 md:px-8 mt-5">
        <div className="flex flex-col text-center md:flex-row items-center mr-5">
          <MapPin color="#0851C2" size={24} />
          <p className="text-[#464646] ml-1 text-lg">{internship?.location}</p>
        </div>
        <div className="flex flex-col text-center md:flex-row items-center mr-5">
          <Banknote color="#0851C2" size={24} />
          <p className="text-[#464646] ml-1 text-lg">
            ₹{internship?.stipend.toLocaleString()}/month
          </p>
        </div>
        <div className="flex flex-col text-center md:flex-row items-center mr-5">
          <Clock3 color="#0851C2" size={24} />
          <p className="text-[#464646] ml-1 text-lg">{internship?.duration} month(s)</p>
        </div>
      </div>
      <div className="flex flex-col px-4 md:px-8">
        <h6 className="font-semibold text-2xl py-5">Description:</h6>
        <p className="text-[#464646] text-md px-5 pb-5 whitespace-pre-line">
          {internship?.description.replace(/\n\n/g, "\n")}
        </p>
      </div>
      <div className="flex flex-col px-4 md:px-8 mb-10">
        <h6 className="font-semibold text-2xl py-5">Skills:</h6>
        <div className="flex flex-wrap gap-2 px-5 justify-start">
          {internship?.skills.map((skill) => (
            <span
              key={skill.id}
              className="px-4 py-1 bg-[#EEF7FE] text-[#13428D] border border-[#13428D] rounded-full text-sm md:text-base"
            >
              {skill.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
