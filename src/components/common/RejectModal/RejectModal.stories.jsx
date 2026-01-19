import { useState } from 'react';
import RejectModal from './RejectModal';

export default {
  title: 'Molecule/RejectModal',
  component: RejectModal,
  parameters: {
    layout: 'fullscreen',
  },
};

const Template = (args) => {
  const [isOpen, setIsOpen] = useState(true);
  const [lastSubmitted, setLastSubmitted] = useState(null);

  const handleSubmit = (reason) => {
    setLastSubmitted(reason);
    console.log('Rejected with reason:', reason);
    setIsOpen(false);
  };

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-4 bg-gray-200">
      <button 
        onClick={() => setIsOpen(true)}
        className="rounded bg-black px-4 py-2 text-white"
      >
        모달 열기
      </button>
      
      {lastSubmitted && (
        <p className="font-bold text-red-500">
          마지막 전송 내용: {lastSubmitted}
        </p>
      )}

      <RejectModal
        {...args}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export const Desktop = Template.bind({});
Desktop.args = {};

export const Mobile = Template.bind({});
Mobile.args = {
  forceMobile: true,
};
Mobile.parameters = {
  viewport: {
    defaultViewport: 'mobile1', // iPhone SE
  },
};
