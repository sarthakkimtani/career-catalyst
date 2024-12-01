import { Collapsible } from "@/components/ui/Collapsible";
import { faqData } from "@/content/faqData";

export const FAQList = () => {
  return (
    <div id="select" className="flex flex-col items-center justify-center w-full py-32">
      {faqData.map((item, index) => (
        <Collapsible
          className="w-4/5 md:w-2/3"
          key={index}
          question={item.question}
          answer={item.answer}
        />
      ))}
    </div>
  );
};
