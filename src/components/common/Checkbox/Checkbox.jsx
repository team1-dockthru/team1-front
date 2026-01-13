'use client';

import { useId } from 'react';
import './Checkbox.css';

export default function Checkbox({ checked, onChange, label, disabled = false }) {
  const id = useId();

  return (
    <label className={`chk ${disabled ? 'chk--disabled' : ''}`} htmlFor={id}>
      <input
        id={id}
        className="chk__input"
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange?.(e.target.checked)}
        disabled={disabled}
      />
      <span className="chk__box" aria-hidden="true" />
      {label ? <span className="chk__label font-14-regular">{label}</span> : null}
    </label>
  );
}
