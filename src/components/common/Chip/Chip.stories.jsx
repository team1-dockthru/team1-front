'use client';

import Chip from './Chip';

export default {
  title: 'Atom/Chip',
  component: Chip,
};

export function Types() {
  return (
    <div className="flex flex-wrap gap-3">
      <Chip variant="type-nextjs">Next.js</Chip>
      <Chip variant="type-api">API</Chip>
      <Chip variant="type-career">Career</Chip>
      <Chip variant="type-modernjs">ModernJS</Chip>
      <Chip variant="type-web">Web</Chip>
    </div>
  );
}

export function Categories() {
  return (
    <div className="flex flex-wrap gap-3">
      <Chip variant="category-doc">공식문서</Chip>
      <Chip variant="category-blog">블로그</Chip>
    </div>
  );
}

export function Status() {
  return (
    <div className="flex flex-wrap gap-3">
      <Chip variant="status-pending">승인 대기</Chip>
      <Chip variant="status-reject">신청 거절</Chip>
      <Chip variant="status-approve">신청 승인</Chip>
      <Chip variant="status-delete">삭제</Chip>
    </div>
  );
}

