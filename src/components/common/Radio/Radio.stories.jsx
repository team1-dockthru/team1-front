'use client';

import { useState } from 'react';
import Radio from './Radio';

export default {
  title: 'Atom/Radio',
  component: Radio,
};

export function Default() {
  const [value, setValue] = useState('a');
  return (
    <div className="flex flex-col gap-3">
      <Radio name="demo" value="a" checked={value === 'a'} onChange={setValue} label="옵션 A" />
      <Radio name="demo" value="b" checked={value === 'b'} onChange={setValue} label="옵션 B" />
    </div>
  );
}

export function Disabled() {
  return <Radio name="demo2" value="a" checked onChange={() => {}} label="비활성" disabled />;
}

