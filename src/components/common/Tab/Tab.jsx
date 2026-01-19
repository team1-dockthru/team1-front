"use client";

import { cn } from "@/lib/utils";

export default function Tab({
  items = [],
  activeKey,
  onChange,
  variant = "middle", // middle | top
  size = "lg", // lg | sm (top 전용)
  className = "",
}) {
  const isTop = variant === "top";

  return (
    <div
      className={cn(
        isTop ? "flex flex-col gap-3" : "inline-flex",
        className
      )}
      role="tablist"
    >
      {items.map((item) => {
        const isActive = item.key === activeKey;
        const isDisabled = Boolean(item.disabled);

        const topSizeClass =
          size === "sm" ? "h-[56px] w-[45px]" : "h-[60px] w-[68px]";

        return (
          <button
            key={item.key}
            type="button"
            role="tab"
            aria-selected={isActive}
            disabled={isDisabled}
            className={cn(
              "font-14-semibold transition-colors",
              isTop
                ? cn(
                    "flex items-center justify-center border bg-white text-[var(--gray-900)]",
                    "border-[var(--gray-300)] rounded-none",
                    topSizeClass,
                    isActive ? "border-[var(--gray-900)]" : "",
                    isDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                  )
                : cn(
                    "px-6 py-4 border-b-[3px] border-b-transparent bg-transparent",
                    isActive
                      ? "text-[var(--gray-900)] border-b-[var(--gray-900)] text-[18px]"
                      : "text-[var(--gray-500)] text-[16px]",
                    isDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                  )
            )}
            onClick={() => {
              if (isDisabled) return;
              onChange?.(item.key);
            }}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
