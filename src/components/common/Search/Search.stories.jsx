import Search from './Search';

export default {
  title: 'Molecule/Search',
  component: Search,
  parameters: {
    layout: 'centered',
  },
};

export const Default = {
  args: {
    placeholder: '챌린지 이름을 검색해보세요',
    onSearch: (value) => console.log('검색어 (Debounced):', value),
  },
  render: (args) => (
    <div className="w-[500px]">
      <Search {...args} />
    </div>
  ),
};

export const FastDebounce = {
  args: {
    ...Default.args,
    delay: 100,
  },
  render: (args) => (
    <div className="w-[500px]">
      <p className="mb-2 text-sm text-gray-500">빠른 피드백 (100ms)</p>
      <Search {...args} />
    </div>
  ),
};

export const SlowDebounce = {
  args: {
    ...Default.args,
    delay: 1000,
  },
  render: (args) => (
    <div className="w-[500px]">
      <p className="mb-2 text-sm text-gray-500">느린 피드백 (1000ms)</p>
      <Search {...args} />
    </div>
  ),
};
