"use client";

import { motion, type HTMLMotionProps, type Transition } from "motion/react";
import * as React from "react";

import Icon from "@/components/Icon";
import { Button } from "@/components/ui/button";
import {
  SlidingNumber,
  type SlidingNumberProps,
} from "@/components/ui/shadcn-io/sliding-number";
import { cn } from "@/lib/utils";

type CounterProps = HTMLMotionProps<"div"> & {
  number: number;
  setNumber: (number: number) => void;
  slidingNumberProps?: Omit<SlidingNumberProps, "number">;
  buttonProps?: Omit<React.ComponentProps<typeof Button>, "onClick">;
  transition?: Transition;
};

function Counter({
  number,
  setNumber,
  className,
  slidingNumberProps,
  buttonProps,
  transition = { type: "spring", bounce: 0, stiffness: 300, damping: 30 },
  ...props
}: CounterProps) {
  return (
    <motion.div
      data-slot="counter"
      layout
      transition={transition}
      className={cn(
        "bg-card flex items-center gap-x-2 rounded-xl border",
        className,
      )}
      {...props}
    >
      <SlidingNumber
        number={number}
        {...slidingNumberProps}
        className={cn("text-lg", slidingNumberProps?.className)}
      />

      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          size="icon"
          {...buttonProps}
          onClick={() => setNumber(number + 1)}
          className={cn(
            "text-foreground size-4 !bg-transparent",
            buttonProps?.className,
          )}
        >
          <Icon src="/icons/keyboard_arrow.svg" className="size-5 rotate-180" />
        </Button>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            size="icon"
            {...buttonProps}
            onClick={() => setNumber(number - 1)}
            className={cn(
              "text-foreground size-4 !bg-transparent",
              buttonProps?.className,
            )}
          >
            <Icon src="/icons/keyboard_arrow.svg" className="size-5" />
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export { Counter, type CounterProps };
