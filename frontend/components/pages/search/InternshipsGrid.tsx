import { Internship } from "@/lib/definitions";
import { InternshipCard } from "./InternshipCard";

export const InternshipsGrid = ({ data }: { data: Internship[] }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 p-8 w-full border-l border-gray-300">
      {data.map((item, index) => (
        <InternshipCard data={item} key={index} />
      ))}
    </div>
  );
};
