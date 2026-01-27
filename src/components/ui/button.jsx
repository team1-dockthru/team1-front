"use client";

import * as React from "react";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl border border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-yellow)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
  {
    variants: {
      variant: {
        solid: "bg-[var(--gray-900)] text-white hover:bg-[var(--gray-800)]",
        outline:
          "bg-white text-[var(--gray-900)] border-[var(--gray-800)] hover:bg-[var(--gray-50)]",
        transparent:
          "bg-[var(--gray-200)] text-[var(--gray-700)] hover:bg-[var(--gray-300)]",
        "filled-tonal":
          "bg-[#ffe6e6] text-[var(--error,#eb3e3e)] hover:bg-[#ffd6d6]",
        brand:
          "bg-[var(--brand-yellow)] text-[var(--gray-900)] border-[var(--gray-900)] hover:brightness-[0.97]",
        "outline-icon":
          "bg-white text-[var(--gray-900)] border-[var(--gray-300)] hover:bg-[var(--gray-50)]",
        icon:
          "size-10 rounded-full bg-white text-[var(--gray-900)] border-[var(--gray-300)] hover:bg-[var(--gray-50)] p-0",
        ghost: "bg-transparent hover:bg-[var(--gray-50)] border-transparent",
      },
      size: {
        sm: "h-8 px-3.5",
        md: "h-10 px-4",
        lg: "h-12 px-[18px]",
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
    },
    compoundVariants: [
      {
        variant: "icon",
        size: "sm",
        className: "size-8",
      },
      {
        variant: "icon",
        size: "lg",
        className: "size-12",
      },
    ],
    defaultVariants: {
      variant: "solid",
      size: "md",
      fullWidth: false,
    },
  }
);

const Button = React.forwardRef(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      leftIcon,
      rightIcon,
      isLoading,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const isDisabled = Boolean(disabled || isLoading);

    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, fullWidth }), className)}
        disabled={isDisabled}
        {...props}
      >
        {leftIcon ? <span className="inline-flex">{leftIcon}</span> : null}
        {children}
        {rightIcon ? <span className="inline-flex">{rightIcon}</span> : null}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
