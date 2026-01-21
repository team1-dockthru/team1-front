'use client';

import { useState } from 'react';
import Input from './Input';

// 아이콘은 너희가 SVGR로 쓰고 있으니까 import 방식으로
import CalendarIcon from '@/assets/icons/ic-deadline-date.svg';

export default {
  title: 'Atom/Input',
  component: Input,
};

export function Email_Default() {
  const [value, setValue] = useState('');
  return (
    <div style={{ width: 420 }}>
      <Input
        label="이메일"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="이메일을 입력해주세요"
      />
    </div>
  );
}

export function Email_Filled() {
  const [value, setValue] = useState('codeit@codeit.com');
  return (
    <div style={{ width: 420 }}>
      <Input
        label="이메일"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="이메일을 입력해주세요"
      />
    </div>
  );
}

export function Email_Error() {
  const [value, setValue] = useState('codeit@codeit.c');
  return (
    <div style={{ width: 420 }}>
      <Input
        label="이메일"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="이메일을 입력해주세요"
        errorText="잘못된 이메일입니다."
      />
    </div>
  );
}

export function Password_Default() {
  const [value, setValue] = useState('');
  return (
    <div style={{ width: 420 }}>
      <Input
        label="비밀번호"
        type="password"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="비밀번호를 입력해주세요"
      />
    </div>
  );
}

export function Password_Filled() {
  const [value, setValue] = useState('abcd1234!');
  return (
    <div style={{ width: 420 }}>
      <Input
        label="비밀번호"
        type="password"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="비밀번호를 입력해주세요"
      />
    </div>
  );
}

export function PasswordConfirm_Error() {
  const [value, setValue] = useState('abcd1234!');
  return (
    <div style={{ width: 420 }}>
      <Input
        label="비밀번호 확인"
        type="password"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="비밀번호를 입력해주세요"
        errorText="비밀번호가 일치하지 않습니다."
      />
    </div>
  );
}

export function Deadline_Date() {
  const [value, setValue] = useState('');
  return (
    <div style={{ width: 420 }}>
      <Input
        label="마감 기한"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="YY/MM/DD"
        rightIcon={<CalendarIcon width={32} height={32} />}
      />
    </div>
  );
}
