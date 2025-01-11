import { FilterX } from "lucide-react";

export const EmptyStateBanner = () => {
  return (
    <div className="flex flex-col w-full items-center justify-center p-40 border-l border-gray-300">
      <FilterX color="#4B5563" size={100} />
      <h5 className="font-semibold text-xl text-center mt-5">No Internships Found</h5>
      <p className="text-md mt-1 text-center text-gray-500">Try adjusting your search criteria.</p>
    </div>
  );
};
