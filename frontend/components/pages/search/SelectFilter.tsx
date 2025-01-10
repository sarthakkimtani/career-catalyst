"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { Checkbox } from "@/components/ui/Checkbox";

interface SelectFilterProps {
  title: string;
  values: string[];
  queryKey: string;
}

export const SelectFilter = ({ title, values, queryKey }: SelectFilterProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const searchParamsSnapshot = searchParams.toString();
  const initialValues = searchParams.get(queryKey)?.split(",") ?? [];
  const [checkedValues, setCheckedValues] = useState<string[]>(initialValues);

  useEffect(() => {
    const currentParams = new URLSearchParams(searchParamsSnapshot);
    const currentValues = currentParams.get(queryKey)?.split(",") ?? [];
    if (currentValues.sort().join(",") === checkedValues.sort().join(",")) return;

    currentParams.delete(queryKey);
    if (checkedValues.length > 0) {
      currentParams.append(queryKey, checkedValues.join(","));
    }

    router.push(`${pathname}?${currentParams.toString()}`);
  }, [checkedValues, pathname, queryKey, router, searchParamsSnapshot]);

  const handleCheckboxChange = (value: string) => {
    setCheckedValues((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  return (
    <div className="flex flex-col w-full mt-4 px-8">
      <p className="text-lg text-gray-500 font-medium mt-4">{title}:</p>
      <div className="flex flex-col">
        {values.map((value) => (
          <Checkbox
            key={value}
            value={value.toLowerCase()}
            checked={checkedValues.includes(value.toLowerCase())}
            onChange={() => handleCheckboxChange(value.toLowerCase())}
          >
            {value}
          </Checkbox>
        ))}
      </div>
    </div>
  );
};
