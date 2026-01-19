import { useState } from 'react';
import Sort from './Sort';

export default {
  title: 'Molecule/Sort',
  component: Sort,
  parameters: {
    layout: 'centered',
  },
};

const sortOptions = [
  '승인 대기',
  '신청 승인',
  '신청 거절',
  '신청 시간 빠른순',
  '신청 시간 느린순',
  '마감 기한 빠른순',
  '마감 기한 느린순',
];

const filterOptions = ['Next.js', 'API', 'Career', 'Modern JS', 'Web'];

export const Default = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <div className="flex h-[400px] items-start gap-4">
        <Sort
          variant="default"
          options={sortOptions}
          value={value}
          onChange={setValue}
          placeholder="승인 대기"
        />
      </div>
    );
  },
};

export const Filter = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <div className="flex h-[400px] items-start gap-4">
        <Sort
          variant="filter"
          options={filterOptions}
          value={value}
          onChange={setValue}
          placeholder="필터"
        />
      </div>
    );
  },
};

export const FilterActive = {
  render: () => {
    const [value, setValue] = useState('Career');
    return (
      <div className="flex h-[400px] items-start gap-4">
        <Sort
          variant="filter"
          options={filterOptions}
          value={value}
          onChange={setValue}
          placeholder="필터"
        />
        <div className="text-sm text-gray-400 mt-2">← 값이 있으면 자동으로 블랙 테마</div>
      </div>
    );
  },
};

export const FilterCount = {
  render: () => {
    const [value, setValue] = useState('필터(3)');
    return (
      <div className="flex h-[400px] items-start gap-4">
        <Sort
          variant="filter"
          options={filterOptions}
          value={value}
          onChange={setValue}
          active={true}
        />
        <div className="text-sm text-gray-400 mt-2">← `active={true}` 강제 적용</div>
      </div>
    );
  },
};
