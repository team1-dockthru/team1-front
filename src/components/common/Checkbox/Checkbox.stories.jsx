'use client';

import { useState } from 'react';
import Checkbox from './Checkbox';

export default {
  title: 'Atom/Checkbox',
  component: Checkbox,
};

export function Default() {
  const [checked, setChecked] = useState(false);
  return <Checkbox checked={checked} onChange={setChecked} label="체크박스" />;
}

export function Checked() {
  const [checked, setChecked] = useState(true);
  return <Checkbox checked={checked} onChange={setChecked} label="체크됨" />;
}

export function Disabled() {
  return <Checkbox checked={false} onChange={() => {}} label="비활성" disabled />;
}

