"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface FilterFieldProps {
  icon: React.ReactNode;
  placeholder: string;
  queryKey: string;
  last?: boolean;
}

export const FilterField = ({ icon, placeholder, queryKey, last }: FilterFieldProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [inputValue, setInputValue] = useState<string>(searchParams.get(queryKey) ?? "");

  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(Array.from(searchParams.entries()));

      const sanitizedInputValue = inputValue.replace(/,/g, "");
      if (sanitizedInputValue) {
        params.set(queryKey, sanitizedInputValue);
      } else {
        params.delete(queryKey);
      }

      const queryString = params.toString();
      if (queryString !== searchParams.toString()) {
        router.push(`${pathname}${queryString ? `?${queryString}` : ""}`);
      }
    }, 750);

    return () => clearTimeout(timer);
  }, [router, queryKey, pathname, inputValue, searchParams]);

  return (
    <div className="flex flex-row">
      <div className="w-10 h-10 p-2 flex items-center justify-center border border-gray-600 rounded-full">
        {icon}
      </div>
      <div className={`border-b lg:border-b-0 border-gray-600 ${!last && "lg:border-r"} ml-4`}>
        <input
          type="text"
          value={inputValue}
          className="bg-transparent text-white w-4/5 lg:w-72 py-2 border-none focus:outline-none focus:ring-0 placeholder:text-lg"
          placeholder={placeholder}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </div>
    </div>
  );
};
