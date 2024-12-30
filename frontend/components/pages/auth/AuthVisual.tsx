import Image from "next/image";

import Gradient from "@/assets/gradient.png";

export const AuthVisual = () => {
  return (
    <div className="hidden lg:block relative w-[49%] h-[98%]">
      <Image
        className="w-full h-full rounded-2xl"
        src={Gradient}
        draggable={false}
        alt="Gradient"
      />
      <h3 className="absolute inset-0 flex items-center justify-center font-medium italic text-4xl text-center px-10 text-white leading-snug">
        Build The Career You Deserve <br /> One Step at a Time...
      </h3>
    </div>
  );
};
