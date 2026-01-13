'use client';

import { useId } from 'react';
import './Radio.css';

export default function Radio({ name, checked, onChange, label, disabled = false, value }) {
  const id = useId();

  return (
    <label className={`radio ${disabled ? 'radio--disabled' : ''}`} htmlFor={id}>
      <input
        id={id}
        className="radio__input"
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={() => onChange?.(value)}
        disabled={disabled}
      />
      <span className="radio__circle" aria-hidden="true" />
      {label ? <span className="radio__label font-14-regular">{label}</span> : null}
    </label>
  );
}
