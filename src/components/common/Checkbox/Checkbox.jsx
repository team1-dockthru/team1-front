"use client";

import { useId } from "react";

import { cn } from "@/lib/utils";

export default function Checkbox({ checked, onChange, label, disabled = false, className }) {
  const id = useId();

  return (
    <label
      className={cn(
        "inline-flex items-center gap-2.5",
        disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer",
        className
      )}
      htmlFor={id}
    >
      <input
        id={id}
        className="peer sr-only"
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange?.(e.target.checked)}
        disabled={disabled}
      />
      <span
        aria-hidden="true"
        className={cn(
          "inline-flex size-7 items-center justify-center rounded-md border bg-white",
          "border-[var(--gray-300)]",
          "peer-checked:border-[var(--gray-900)] peer-checked:bg-[var(--gray-900)]",
          "peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[var(--brand-yellow)]"
        )}
      >
        <span
          className={cn(
            "block h-[6px] w-[10px] rotate-[-45deg] border-b-2 border-l-2 border-white opacity-0",
            "peer-checked:opacity-100"
          )}
        />
      </span>
      {label ? <span className="font-14-regular">{label}</span> : null}
    </label>
  );
}
