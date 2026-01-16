import ActionCard from './ActionCard';

export default {
  title: 'Molecule/ActionCard',
  component: ActionCard,
  parameters: {
    layout: 'centered',
  },
};

export const Default = {
  args: {
    deadline: '2024년 3월 3일',
    currentParticipants: 15,
    maxParticipants: 15,
    onPrimaryClick: () => console.log('원문 보기 클릭'),
    onSecondaryClick: () => console.log('작업 도전하기 클릭'),
  },
  render: (args) => (
    <div className="w-[340px] sm:w-[500px]">
      <ActionCard {...args} />
    </div>
  ),
};

export const Mobile = {
  args: { ...Default.args },
  render: (args) => (
    <div className="w-[340px]">
      <ActionCard {...args} />
    </div>
  ),
};

export const Desktop = {
  args: { ...Default.args },
  render: (args) => (
    <div className="w-[520px]">
      <ActionCard {...args} />
    </div>
  ),
};
