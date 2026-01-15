"use client";

import * as React from "react";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex h-[26px] items-center justify-center whitespace-nowrap font-semibold",
  {
    variants: {
      variant: {
        // type-*
        "type-nextjs": "rounded-lg bg-[#79e16a] px-3 py-[3px] text-[var(--gray-900)]",
        "type-api": "rounded-lg bg-[#ff905e] px-3 py-[3px] text-[var(--gray-900)]",
        "type-career": "rounded-lg bg-[#7eb2ee] px-3 py-[3px] text-[var(--gray-900)]",
        "type-modernjs": "rounded-lg bg-[#f66e6b] px-3 py-[3px] text-[var(--gray-900)]",
        "type-web": "rounded-lg bg-[#f66e6b] px-3 py-[3px] text-[var(--gray-900)]",

        // category-*
        "category-doc":
          "rounded-lg border border-[var(--gray-300)] bg-white px-[7px] py-[5px] text-[var(--gray-800)]",
        "category-blog":
          "rounded-lg border border-[var(--gray-300)] bg-white px-[7px] py-[5px] text-[var(--gray-800)]",

        // status-*
        "status-pending": "rounded bg-[#fffde7] px-2 py-1 text-[#f0b400]",
        "status-reject": "rounded bg-[#fff0f0] px-2 py-1 text-[var(--error)]",
        "status-approve": "rounded bg-[#dff0ff] px-2 py-1 text-[#2f80ed]",
        "status-delete": "rounded bg-[var(--gray-200)] px-2 py-1 text-[var(--gray-700)]",
      },
    },
    defaultVariants: {
      variant: "type-nextjs",
    },
  }
);

function Badge({ className, variant, ...props }) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };

