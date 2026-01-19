'use client';

import { useState } from 'react';
import Pagination from './Pagination';

export default {
  title: 'Molecule/Pagination',
  component: Pagination,
};

export function Basic() {
  const [page, setPage] = useState(5);
  return <Pagination currentPage={page} totalPages={20} onPageChange={setPage} />;
}

export function SmallTotal() {
  const [page, setPage] = useState(1);
  return <Pagination currentPage={page} totalPages={3} onPageChange={setPage} />;
}

export function Disabled() {
  return <Pagination currentPage={3} totalPages={20} onPageChange={() => {}} disabled />;
}

