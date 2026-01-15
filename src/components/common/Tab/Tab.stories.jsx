'use client';

import { useState } from 'react';
import Tab from './Tab';

export default {
  title: 'Molecule/Tab',
  component: Tab,
};

export function Middle() {
  const [active, setActive] = useState('progress');

  const items = [
    { key: 'progress', label: '진행중인 챌린지' },
    { key: 'done', label: '완료한 챌린지' },
  ];

  return (
    <div style={{ padding: 24 }}>
      <Tab variant="middle" items={items} activeKey={active} onChange={setActive} />
    </div>
  );
}

export function Middle_Disabled() {
  const [active, setActive] = useState('progress');

  const items = [
    { key: 'progress', label: '진행중인 챌린지' },
    { key: 'done', label: '완료한 챌린지', disabled: true },
  ];

  return (
    <div style={{ padding: 24 }}>
      <Tab variant="middle" items={items} activeKey={active} onChange={setActive} />
    </div>
  );
}

export function Top_Large() {
  const [active, setActive] = useState('t1');

  const items = [
    { key: 't1', label: '탭 01' },
    { key: 't2', label: '탭 02' },
    { key: 't3', label: '탭 03' },
  ];

  return (
    <div style={{ padding: 24 }}>
      <Tab variant="top" size="lg" items={items} activeKey={active} onChange={setActive} />
    </div>
  );
}

export function Top_Small() {
  const [active, setActive] = useState('t1');

  const items = [
    { key: 't1', label: '탭 01' },
    { key: 't2', label: '탭 02' },
    { key: 't3', label: '탭 03' },
  ];

  return (
    <div style={{ padding: 24 }}>
      <Tab variant="top" size="sm" items={items} activeKey={active} onChange={setActive} />
    </div>
  );
}
