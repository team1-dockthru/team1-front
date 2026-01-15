"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

function Pagination({ className, ...props }) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    />
  );
}

function PaginationContent({ className, ...props }) {
  return <ul className={cn("flex flex-row items-center gap-3", className)} {...props} />;
}

function PaginationItem({ className, ...props }) {
  return <li className={cn("", className)} {...props} />;
}

function PaginationLink({ className, isActive, ...props }) {
  return (
    <Button
      variant={isActive ? "solid" : "outline-icon"}
      size="md"
      className={cn("h-12 w-12 rounded-xl px-0", className)}
      aria-current={isActive ? "page" : undefined}
      {...props}
    />
  );
}

function PaginationPrevious({ className, ...props }) {
  return (
    <Button
      variant="solid"
      size="md"
      className={cn("h-10 w-10 rounded-full px-0 text-[var(--gray-200)]", className)}
      aria-label="이전 페이지"
      {...props}
    >
      ‹
    </Button>
  );
}

function PaginationNext({ className, ...props }) {
  return (
    <Button
      variant="solid"
      size="md"
      className={cn("h-10 w-10 rounded-full px-0 text-[var(--gray-200)]", className)}
      aria-label="다음 페이지"
      {...props}
    >
      ›
    </Button>
  );
}

function PaginationEllipsis({ className, ...props }) {
  return (
    <span
      aria-hidden
      className={cn("inline-flex w-6 justify-center text-[var(--gray-500)]", className)}
      {...props}
    >
      …
    </span>
  );
}

export {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
};

