"use client";

import { useId } from "react";

import { cn } from "@/lib/utils";

export default function Radio({
  name,
  checked,
  onChange,
  label,
  disabled = false,
  value,
  className,
}) {
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
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={() => onChange?.(value)}
        disabled={disabled}
      />
      <span
        aria-hidden="true"
        className={cn(
          "inline-flex size-7 items-center justify-center rounded-full border bg-white",
          "border-[var(--gray-300)]",
          "peer-checked:border-[var(--gray-900)] peer-checked:bg-[var(--gray-900)]",
          "peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[var(--brand-yellow)]"
        )}
      >
        <span
          className={cn(
            "block size-2 rounded-full bg-white opacity-0",
            "peer-checked:opacity-100"
          )}
        />
      </span>
      {label ? <span className="font-14-regular">{label}</span> : null}
    </label>
  );
}
