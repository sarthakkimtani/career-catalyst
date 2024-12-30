"use client";

import { animate, useInView } from "motion/react";
import { useEffect, useRef } from "react";

type CounterProps = {
  from: number;
  to: number;
  className?: string;
};

export const Counter = ({ from, to, className }: CounterProps) => {
  const nodeRef = useRef<HTMLParagraphElement | null>(null);
  const isInView = useInView(nodeRef, { once: true });

  useEffect(() => {
    const node = nodeRef.current;

    if (node && isInView) {
      const controls = animate(from, to, {
        duration: 1.3,
        onUpdate(value) {
          node.textContent = value.toFixed(0);
        },
      });

      return () => controls.stop();
    }
  }, [from, to, isInView]);

  return <p className={className} ref={nodeRef} />;
};
