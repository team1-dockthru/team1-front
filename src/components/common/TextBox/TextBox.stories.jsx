import { useState } from 'react';
import TextBox from './TextBox';

export default {
  title: 'Atom/TextBox',
  component: TextBox,
  parameters: {
    layout: 'centered',
  },
};

export const Default = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <div className="w-[600px]">
        <TextBox
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="피드백을 남겨주세요"
        />
      </div>
    );
  },
};

export const WithValue = {
  render: () => {
    const [value, setValue] = useState(
      '피드백을 남기고 있습니다 .. 최대 길이 이후로 스크롤이 들어갑니다.. 피드백을 남기고 있습니다 .. 최대 길이 이후로 스크롤이 들어갑니다.. 피드백을 남기고 있습니다 .. 최대 길이 이후로 스크롤이 들어갑니다.. 피드백을 남기고 있습니다 .. 최대 길이 이후로 스크롤이 들어갑니다.. 피드백을 남기고 있습니다 .. 최대 길이 이후로 스크롤이 들어갑니다.. 피드백을 남기고 있습니다 .. 최대 길이'
    );
    return (
      <div className="w-[600px]">
        <TextBox
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="피드백을 남겨주세요"
        />
      </div>
    );
  },
};

export const Disabled = {
  args: {
    disabled: true,
    value: '비활성화된 상태입니다.',
  },
  render: (args) => (
    <div className="w-[600px]">
      <TextBox {...args} />
    </div>
  ),
};
