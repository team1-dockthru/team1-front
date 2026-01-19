"use client";

import { useId } from "react";

import { cn } from "@/lib/utils";

import CheckboxDefaultIcon from '@/assets/icons/ic-chekbox-default.svg';
import CheckboxCheckedIcon from '@/assets/icons/ic-checkbox-checked.svg';

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
      
      {checked ? (
        <CheckboxCheckedIcon className="h-[18px] w-[18px]" />
      ) : (
        <CheckboxDefaultIcon className="h-[18px] w-[18px]" />
      )}

      {label ? <span className="font-14-regular pt-[1px]">{label}</span> : null}
    </label>
  );
}
