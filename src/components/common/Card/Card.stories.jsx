import Card from './Card';

export default {
  title: 'Molecule/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
};

const defaultArgs = {
  statusText: '모집이 완료된 상태에요',
  title: 'Next.js - App Router: Routing Fundamentals',
  tags: [
    { text: 'Next.js', variant: 'type-nextjs' },
    { text: '공식문서', variant: 'category-doc' },
  ],
  deadline: '2024년 3월 3일 마감',
  participants: '5/5 참여 완료',
  buttonText: '도전 계속하기',
  onAction: () => console.log('액션 클릭!'),
  onMenu: () => console.log('메뉴 클릭!'),
};

export const Desktop = {
  args: defaultArgs,
  render: (args) => (
    <div className="w-[800px]">
      <Card {...args} />
    </div>
  ),
};

export const Tablet = {
  args: defaultArgs,
  render: (args) => (
    <div className="w-[648px]">
      <Card {...args} />
    </div>
  ),
};

export const Mobile = {
  args: defaultArgs,
  render: (args) => (
    <div className="w-[343px]">
      <Card {...args} />
    </div>
  ),
};
