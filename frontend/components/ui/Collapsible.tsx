"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface CollapsibleProps {
  question: string;
  answer: string;
  className?: string;
}

const variants = {
  open: { opacity: 1, height: "auto" },
  collapsed: { opacity: 0, height: 0 },
};

const contentTransition = { duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] };

export const Collapsible = React.memo(({ question, answer, className }: CollapsibleProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className={`border-b border-gray-200 py-6 ${className}`}>
      <button
        onClick={toggle}
        className={`flex justify-between items-center w-full text-left`}
        aria-expanded={isOpen}
        aria-controls="collapsible-content"
      >
        <span className="text-2xl font-medium">{question}</span>
        <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
          <ChevronDown className="w-5 h-5" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            id="collapsible-content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={variants}
            transition={contentTransition}
            style={{ overflow: "hidden" }}
          >
            <motion.div
              variants={{ collapsed: { y: -10 }, open: { y: 0 } }}
              transition={{ duration: 0.2 }}
            >
              <div className="mt-2 text-lg text-gray-600">{answer}</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

Collapsible.displayName = "Collapsible";
