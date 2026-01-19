'use client';

import { Plus } from 'lucide-react';
import CircleIconButton from './CircleIconButton';

export default {
  title: 'Atom/CircleIconButton',
  component: CircleIconButton,
};

export function Large() {
  return (
    <CircleIconButton ariaLabel="추가" size="lg" onClick={() => {}}>
      <Plus className="h-6 w-6 text-white" />
    </CircleIconButton>
  );
}

export function Small() {
  return (
    <CircleIconButton ariaLabel="추가" size="sm" onClick={() => {}}>
      <Plus className="h-5 w-5 text-white" />
    </CircleIconButton>
  );
}

