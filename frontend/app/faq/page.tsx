import { Hero } from "@/components/pages/faq/Hero";
import { FAQList } from "@/components/pages/faq/FAQList";

export default function FAQ() {
  return (
    <div className="flex flex-col items-center justify-center mt-4">
      <Hero />
      <FAQList />
    </div>
  );
}
