interface CheckboxProps {
  children: React.ReactNode;
  value?: string | number | readonly string[] | undefined;
}

export const Checkbox = ({ children, value }: CheckboxProps) => {
  return (
    <label className="flex items-center mt-2 text-gray-700">
      <input
        type="checkbox"
        value={value}
        className="mr-2 rounded cursor-pointer bg-gray-200 border-transparent focus:border-transparent focus:bg-gray-200 text-gray-700 focus:ring-1 focus:ring-offset-2 focus:ring-gray-500"
      />
      {children}
    </label>
  );
};
