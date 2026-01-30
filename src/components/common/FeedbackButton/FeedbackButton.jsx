"use client";

import { cn } from "@/lib/utils";

export default function FeedbackButton({
  variant = "gray",
  children,
  onClick,
  ariaLabel,
  className,
  ...props
}) {
  return (
    <button
      type="button"
      className={cn(
        "inline-flex h-16 w-16 items-center justify-center rounded-full border-0",
        variant === "dark" ? "bg-[var(--gray-900)]" : "bg-[var(--gray-200)]",
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
