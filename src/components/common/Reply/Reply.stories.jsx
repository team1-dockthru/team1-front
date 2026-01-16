import Reply from './Reply';

export default {
  title: 'Molecule/Reply',
  component: Reply,
  parameters: {
    layout: 'centered',
  },
};

const Template = (args) => (
  <div className="w-[800px] bg-gray-100 p-10">
    <Reply {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  nickname: '럽윈즈올',
  date: '24/01/17 15:38',
  content: '일반적으로 개발자는 일련의 하드 스킬을 가지고 있어야 → 일반적으로 개발자는 개인이 갖고 있는 스킬셋에 대한 전문성이 있어야 커리어에서 유망하다고 여겨집니다. 라고 바꾸는게 더 자연스러운 말일 것 같아요',
};

export const MultipleReplies = (args) => (
  <div className="flex w-[800px] flex-col gap-4 bg-gray-100 p-10">
    <Reply
      nickname="검은치마"
      date="24/01/17 15:38"
      content="일반적으로 개발자는 일련의 하드 스킬을 가지고 있어야 → 일반적으로 개발자는 개인이 갖고 있는 스킬셋에 대한 전문성이 있어야 커리어에서 유망하다고 여겨집니다. 라고 바꾸는게 더 자연스러운 말일 것 같아요"
    />
    <Reply
      nickname="야옹야옹"
      date="24/01/17 15:39"
      content="동감합니다. 표현이 훨씬 매끄럽네요!"
    />
  </div>
);
