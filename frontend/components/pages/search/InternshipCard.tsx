import Image from "next/image";
import Link from "next/link";

import { getPastelColor } from "@/utils/getPastelColor";
import { Internship } from "@/lib/definitions";
import { cn } from "@/utils/cn";

export const InternshipCard = ({ data }: { data: Internship }) => {
  return (
    <Link
      href={`/internship/${data.id}`}
      className="flex flex-col w-full h-60 p-2 rounded-2xl border border-[#BABABA] cursor-pointer transform duration-300 hover:scale-102 hover:shadow-lg"
    >
      <div
        className={cn(
          "flex flex-row items-center justify-between h-44 mb-4 px-4 py-8 rounded-xl overflow-hidden",
          getPastelColor(data.company.name)
        )}
      >
        <div className="flex flex-col overflow-hidden">
          <p className="text-md mb-2 break-words text-ellipsis overflow-hidden">
            {data.company.name}
          </p>
          <h3 className="text-2xl font-semibold break-words text-ellipsis overflow-hidden">
            {data.title}
          </h3>
        </div>
        {data.company.logoUrl ? (
          <div className="w-20 h-20 p-2">
            <Image
              src={data.company.logoUrl}
              className="rounded-full cursor-pointer object-contain"
              alt="company-logo"
              width={80}
              height={80}
            />
          </div>
        ) : null}
      </div>
      <div className="flex flex-row items-center justify-between px-4 pb-2">
        <div className="flex flex-col">
          <p className="text-md font-semibold">₹{data.stipend.toLocaleString()}/month</p>
          <p className="text-sm text-gray-500">{data.location}</p>
        </div>
        <button className="bg-black text-white px-4 py-2 rounded-full">Details</button>
      </div>
    </Link>
  );
};
