export const FilterField = ({
  icon,
  placeholder,
  last,
}: {
  icon: React.ReactNode;
  placeholder: string;
  last?: boolean;
}) => {
  return (
    <div className="flex flex-row">
      <div className="w-10 h-10 p-2 flex items-center justify-center border border-gray-600 rounded-full">
        {icon}
      </div>
      <div className={`border-b lg:border-b-0 ${!last && "lg:border-r border-gray-600"} ml-4`}>
        <input
          type="text"
          className="bg-transparent text-white w-4/5 lg:w-72 py-2 border-none focus:outline-none focus:ring-0 placeholder:text-lg"
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};
