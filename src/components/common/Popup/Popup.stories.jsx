import { useState } from 'react';
import Popup from './Popup';

export default {
  title: 'Molecule/Popup',
  component: Popup,
  parameters: {
    layout: 'fullscreen',
  },
};

const Template = (args) => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="relative flex h-screen w-full items-center justify-center bg-gray-200">
      <button 
        onClick={() => setIsOpen(true)}
        className="rounded bg-black px-4 py-2 text-white"
      >
        팝업 열기
      </button>
      <Popup 
        {...args} 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)}
        onConfirm={() => {
          console.log('확인 클릭!');
          setIsOpen(false);
        }}
      />
    </div>
  );
};

export const Desktop = Template.bind({});
Desktop.args = {
  message: '가입이 완료되었습니다!',
  buttonText: '확인',
};

export const Mobile = {
  args: {
    message: '가입이 완료되었습니다!',
    buttonText: '확인',
    forceMobile: true, // 강제 모바일 뷰 적용
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1', // 뷰포트도 모바일로 맞추지만, forceMobile이 더 우선함
    },
  },
  render: (args) => {
    const [isOpen, setIsOpen] = useState(true);
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gray-200">
        <button 
          onClick={() => setIsOpen(true)}
          className="rounded bg-black px-4 py-2 text-white"
        >
          팝업 열기
        </button>
        <Popup 
          {...args} 
          isOpen={isOpen} 
          onClose={() => setIsOpen(false)}
          onConfirm={() => setIsOpen(false)}
        />
      </div>
    );
  },
};
