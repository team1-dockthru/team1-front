// src/components/common/Chip/Chip.jsx
"use client";

import { Badge } from "@/components/ui/badge";

export default function Chip({
  children,
  variant = 'type-nextjs', // type-nextjs | type-api | category-doc | status-pending ...
  className = '',
  ...props
}) {
  return (
    <Badge variant={variant} className={className} {...props}>
      {children}
    </Badge>
  );
}
