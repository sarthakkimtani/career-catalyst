import { Counter } from "@/components/ui/Counter";
import { Divider } from "@/components/ui/Divider";

export const Stats = () => {
  return (
    <div className="flex flex-col items-center w-[98%] pt-36 bg-gradient-to-r from-[#4A154B] to-[#FF8576] rounded-2xl text-white pb-32 lg:h-screen">
      <h2 className="text-3xl px-2 md:px-0 md:text-5xl md:leading-[65px] lg:text-6xl text-center font-semibold">
        Unlock Endless Opportunities
      </h2>
      <Divider />
      <div className="flex flex-col md:flex-row w-9/12 items-center justify-between px-10">
        <div className="w-full md:w-6/12 text-md text-center md:text-left md:text-lg">
          Our platform hosts 1000+ internships to help individuals kickstart their careers and
          achieve their goals.
        </div>
        <div className="w-6/12 flex flex-row justify-center md:justify-end mt-10 md:mt-0">
          <Counter
            className="text-5xl md:text-6xl lg:text-8xl font-bold text-right"
            from={0}
            to={1000}
          />
          <span className="text-5xl md:text-6xl lg:text-8xl font-bold text-right">+</span>
        </div>
      </div>
      <Divider />
      <div className="flex flex-col md:flex-row w-9/12 items-center justify-between px-10">
        <div className="w-full md:w-6/12 text-md text-center md:text-left md:text-lg">
          We tap into the vast network of 500+ leading companies, providing a wide range of valuable
          & diverse career opportunities.
        </div>
        <div className="w-6/12 flex flex-row justify-center md:justify-end mt-10 md:mt-0">
          <Counter
            className="text-5xl md:text-6xl lg:text-8xl font-bold text-right"
            from={0}
            to={500}
          />
          <span className="text-5xl md:text-6xl lg:text-8xl font-bold text-right">+</span>
        </div>
      </div>
    </div>
  );
};
