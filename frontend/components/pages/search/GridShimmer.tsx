export const GridShimmer = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 p-8 w-full border-l border-gray-300">
      {Array.from({ length: 42 }).map((_, index) => (
        <div
          key={index}
          className="flex flex-col w-full h-60 p-2 rounded-2xl bg-gray-200 animate-pulse"
        />
      ))}
    </div>
  );
};
