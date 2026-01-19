"use client";

import { useId } from "react";

import { cn } from "@/lib/utils";

import RadioDefaultIcon from '@/assets/icons/ic-radio-default.svg';
import RadioCheckedIcon from '@/assets/icons/ic-radio-checked.svg';

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
      
      {checked ? (
        <RadioCheckedIcon className="h-6 w-6" />
      ) : (
        <RadioDefaultIcon className="h-6 w-6" />
      )}

      {label ? <span className="font-14-regular pt-[1px]">{label}</span> : null}
    </label>
  );
}
