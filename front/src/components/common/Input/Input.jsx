// src/components/common/Input/Input.jsx
'use client';

import { useId, useState } from 'react';
import './input.css';

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
    <div className={['inputField', className].filter(Boolean).join(' ')}>
      {label ? (
        <label className="inputField__label font-14-medium" htmlFor={id}>
          {label}
        </label>
      ) : null}

      <div className={`inputField__box ${errorText ? 'inputField__box--error' : ''}`}>
        <input
          id={id}
          className="inputField__input font-14-regular"
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
            className="inputField__iconBtn"
            aria-label={showPassword ? '비밀번호 숨기기' : '비밀번호 보기'}
            onClick={() => setShowPassword((prev) => !prev)}
          >
            <img
              className="inputField__iconImg"
              src={showPassword ? '/icons/ic-eye-on.svg' : '/icons/ic-eye-off.svg'}
              alt=""
            />
          </button>
        ) : rightIcon ? (
          <span className="inputField__icon">{rightIcon}</span>
        ) : null}
      </div>

      {errorText ? <p className="inputField__error font-14-regular">{errorText}</p> : null}
    </div>
  );
}
