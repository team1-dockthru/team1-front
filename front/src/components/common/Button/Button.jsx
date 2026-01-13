// src/components/common/Button.jsx
'use client';
import './button.css';

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
  const isDisabled = disabled || isLoading;

  return (
    <button
      type={type}
      className={[
        'btn',
        `btn--${variant}`,
        `btn--${size}`,
        fullWidth ? 'btn--full' : '',
        isDisabled ? 'btn--disabled' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      disabled={isDisabled}
      {...props}
    >
      {leftIcon ? <span className="btn__icon">{leftIcon}</span> : null}
      <span className="btn__text">{children}</span>
      {rightIcon ? <span className="btn__icon">{rightIcon}</span> : null}
    </button>
  );
}
