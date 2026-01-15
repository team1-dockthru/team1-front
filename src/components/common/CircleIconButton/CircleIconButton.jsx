"use client";

import { cn } from "@/lib/utils";

export default function CircleIconButton({
  children,
  size = "lg",
  onClick,
  ariaLabel,
  className,
  ...props
}) {
  return (
    <button
      type="button"
      className={cn(
        "inline-flex items-center justify-center rounded-full bg-[var(--gray-900)]",
        size === "sm" ? "h-10 w-10" : "h-16 w-16",
        className
      )}
      onClick={onClick}
      aria-label={ariaLabel}
      {...props}
    >
      {children}
    </button>
  );
}
