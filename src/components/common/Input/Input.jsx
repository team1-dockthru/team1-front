// src/components/common/Input/Input.jsx
'use client';

import { useId, useState } from 'react';

import { cn } from '@/lib/utils';
import { Input as UiInput } from '@/components/ui/input';

export default function Input({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  errorText,
  rightIcon, // password가 아닐 때 우측 아이콘(예: 달력)
  className = '',
  ...props
}) {
  const id = useId();
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === 'password';
  const actualType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      {label ? (
        <label className="font-14-medium text-[var(--gray-800)]" htmlFor={id}>
          {label}
        </label>
      ) : null}

      <div
        className={cn(
          'relative w-full rounded-full border bg-white',
          errorText ? 'border-[var(--error)]' : 'border-[var(--gray-300)]',
        )}
      >
        <UiInput
          id={id}
          className={cn(
            'font-14-regular pr-12',
            // wrapper에서 border를 잡기 때문에 input 자체 border는 제거
            'border-0 focus-visible:ring-0 focus-visible:ring-offset-0',
          )}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          type={actualType}
          {...props}
        />

        {/* 우측 아이콘 영역 */}
        {isPassword ? (
          <button
            type="button"
            className="absolute top-1/2 right-4 inline-flex size-8 -translate-y-1/2 items-center justify-center"
            aria-label={showPassword ? '비밀번호 숨기기' : '비밀번호 보기'}
            onClick={() => setShowPassword((prev) => !prev)}
          >
            <img
              className="size-5 opacity-60"
              src={showPassword ? '/icons/ic-eye-on.svg' : '/icons/ic-eye-off.svg'}
              alt=""
            />
          </button>
        ) : rightIcon ? (
          <span className="absolute top-1/2 right-4 inline-flex size-8 -translate-y-1/2 items-center justify-center">
            {rightIcon}
          </span>
        ) : null}
      </div>

      {errorText ? <p className="font-14-regular text-[var(--error)]">{errorText}</p> : null}
    </div>
  );
}
