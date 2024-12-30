import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/pages/faq/Hero";
import { FAQList } from "@/components/pages/faq/FAQList";

export default function FAQ() {
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center mt-4">
        <Hero />
        <FAQList />
      </div>
      <Footer />
    </>
  );
}
