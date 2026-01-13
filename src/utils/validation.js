// src/utils/validation.js

/* =========================
   Email
========================= */
export function validateEmail(value) {
  if (!value || value.trim().length === 0) return 'empty';

  const email = value.trim();
  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (!isValid) return 'invalidEmail';
  return '';
}

/* =========================
   Password
   - 6~20자
   - 숫자 1개 이상
   - 특수문자 1개 이상
========================= */
export function validatePassword(value) {
  if (!value || value.length === 0) return 'empty';

  const hasNumber = /[0-9]/.test(value);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(value);
  const isValidLength = value.length >= 6 && value.length <= 20;

  if (!isValidLength || !hasNumber || !hasSpecial) {
    return 'invalidPassword';
  }

  return '';
}

/* =========================
   Password Confirm
========================= */
export function validatePasswordCheck(password, confirm) {
  if (!confirm || confirm.length === 0) return 'empty';
  if (password !== confirm) return 'notMatch';
  return '';
}

/* =========================
   Date (YYYY/MM/DD or YYYY-MM-DD)
========================= */
export function validateDate(value) {
  if (!value || value.trim().length === 0) return 'empty';

  const v = value.trim().replaceAll('-', '/');
  const match = /^(\d{4})\/(\d{2})\/(\d{2})$/.exec(v);

  if (!match) return 'invalidDate';

  const y = Number(match[1]);
  const m = Number(match[2]);
  const d = Number(match[3]);

  const date = new Date(y, m - 1, d);
  const isValid = date.getFullYear() === y && date.getMonth() === m - 1 && date.getDate() === d;

  if (!isValid) return 'invalidDate';
  return '';
}
