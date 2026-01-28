// src/components/common/Input/Input.jsx
'use client';

import { useId, useRef, useState, forwardRef } from 'react';

import { cn } from '@/lib/utils';
import { Input as UiInput } from '@/components/ui/input';

const Input = forwardRef(function Input(
  {
    label,
    value,
    onChange,
    placeholder,
    type = 'text',
    errorText,
    rightIcon, // password가 아닐 때 우측 아이콘(예: 달력)
    rightIconLabel = '아이콘 버튼',
    onRightIconClick,
    className = '',
    ...props
  },
  ref
) {
  const id = useId();
  const [showPassword, setShowPassword] = useState(false);
  const inputRef = useRef(null);

  const isPassword = type === 'password';
  const actualType = isPassword ? (showPassword ? 'text' : 'password') : type;
  const setRefs = (node) => {
    inputRef.current = node;
    if (typeof ref === 'function') {
      ref(node);
    } else if (ref) {
      ref.current = node;
    }
  };

  const handleRightIconClick = () => {
    if (onRightIconClick) {
      onRightIconClick();
      return;
    }
    const el = inputRef.current;
    if (!el) return;
    if (typeof el.showPicker === 'function') {
      el.showPicker();
    } else {
      el.focus();
    }
  };

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      {label ? (
        <label className="font-14-medium text-[var(--gray-800)]" htmlFor={id}>
          {label}
        </label>
      ) : null}

      <div
        className={cn(
          'relative w-full rounded-[12px] border bg-white',
          errorText ? 'border-[var(--error)]' : 'border-[var(--gray-300)]'
        )}
      >
        <UiInput
          id={id}
          ref={setRefs}
          className={cn(
            'font-14-regular pr-14 h-[48px] md:h-14',
            // wrapper에서 border를 잡기 때문에 input 자체 border는 제거
            'border-0 rounded-[12px] focus-visible:ring-0 focus-visible:ring-offset-0',
            actualType === 'date' && 'hide-native-date-icon'
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
            className="absolute top-1/2 right-5 inline-flex size-8 -translate-y-1/2 items-center justify-center"
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
          <button
            type="button"
            className="absolute top-1/2 right-5 inline-flex size-8 -translate-y-1/2 items-center justify-center"
            aria-label={rightIconLabel}
            onClick={handleRightIconClick}
          >
            {rightIcon}
          </button>
        ) : null}
      </div>

      {errorText ? (
        <p className="font-14-regular text-[var(--error)]">{errorText}</p>
      ) : null}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
