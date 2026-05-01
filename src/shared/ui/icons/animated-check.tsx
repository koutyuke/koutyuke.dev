import { motion, useReducedMotion } from "motion/react";
import type { FC } from "react";

import type { AnimatedIconProps } from "./type";

export const AnimatedCheckIcon: FC<AnimatedIconProps> = (props) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.14, ease: "easeOut" }}
      {...props}
    >
      <motion.path
        d="m4 12 5 5L20 6"
        initial={shouldReduceMotion ? false : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.22 }}
      />
    </motion.svg>
  );
};
