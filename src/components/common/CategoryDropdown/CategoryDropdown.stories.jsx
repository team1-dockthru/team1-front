import { useState } from 'react';
import CategoryDropdown from './CategoryDropdown';

export default {
  title: 'Molecule/CategoryDropdown',
  component: CategoryDropdown,
  parameters: {
    layout: 'centered',
  },
};

const options = ['Next.js', 'API', 'Career', 'Modern JS', 'Web'];

export const Default = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <div className="w-[500px] h-[400px]">
        <CategoryDropdown
          options={options}
          value={value}
          onChange={setValue}
          placeholder="카테고리"
        />
      </div>
    );
  },
};

export const Selected = {
  render: () => {
    const [value, setValue] = useState('Next.js');
    return (
      <div className="w-[500px] h-[400px]">
        <CategoryDropdown
          options={options}
          value={value}
          onChange={setValue}
        />
      </div>
    );
  },
};
