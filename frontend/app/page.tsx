import { Hero } from "@/components/pages/home/Hero";
import { BrandsList } from "@/components/pages/home/BrandsList";
import { Stats } from "@/components/pages/home/Stats";
import { GetStarted } from "@/components/pages/home/GetStarted";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center mt-4">
      <Hero />
      <BrandsList />
      <Stats />
      <GetStarted />
    </div>
  );
}
