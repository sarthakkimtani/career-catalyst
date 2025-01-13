import { OctagonX } from "lucide-react";

export const ErrorBanner = ({ message }: { message: string }) => {
  return (
    <div className="flex flex-col w-full items-center justify-center border-l border-gray-300 p-40">
      <OctagonX color="#4B5563" size={100} />
      <h5 className="font-semibold text-xl text-center mt-5">{message}</h5>
      <p className="text-md mt-1 text-center text-gray-500">Please try again later.</p>
    </div>
  );
};
