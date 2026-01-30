// src/components/common/Button.jsx
"use client";

import { Button as UiButton } from "@/components/ui/button";

export default function Button({
  children,
  variant = 'solid',
  size = 'md',
  fullWidth = false,
  disabled = false,
  isLoading = false,
  leftIcon,
  rightIcon,
  className = '',
  type = 'button',
  ...props
}) {
  return (
    <UiButton
      type={type}
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      disabled={disabled}
      isLoading={isLoading}
      leftIcon={leftIcon}
      rightIcon={rightIcon}
      className={className}
      {...props}
    >
      {children}
    </UiButton>
  );
}
