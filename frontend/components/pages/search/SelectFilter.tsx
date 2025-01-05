import { Checkbox } from "@/components/ui/Checkbox";

interface SelectFilterProps {
  title: string;
  values: {
    name: string;
    count: number;
  }[];
}

export const SelectFilter = ({ title, values }: SelectFilterProps) => {
  return (
    <div className="flex flex-col w-full mt-4 px-8">
      <p className="text-lg text-gray-500 font-medium mt-4">{title}:</p>
      <div className="flex flex-col">
        {values.map((value) => (
          <Checkbox key={value.name} value={value.name.toLowerCase()}>
            {value.name} ({value.count})
          </Checkbox>
        ))}
      </div>
    </div>
  );
};
