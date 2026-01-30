import { useState } from 'react';
import DeleteModal from './DeleteModal';
import LoginModal from './LoginModal';

export default {
  title: 'Molecule/Modals',
  parameters: {
    layout: 'fullscreen',
  },
};

const DeleteTemplate = (args) => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-4 bg-gray-200">
      <button onClick={() => setIsOpen(true)} className="rounded bg-black px-4 py-2 text-white">
        삭제 모달 열기
      </button>
      <DeleteModal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)} onDelete={() => { alert('삭제됨'); setIsOpen(false); }} />
    </div>
  );
};

export const Delete_Desktop = DeleteTemplate.bind({});
Delete_Desktop.args = {};

export const Delete_Mobile = DeleteTemplate.bind({});
Delete_Mobile.args = { forceMobile: true };
Delete_Mobile.parameters = { viewport: { defaultViewport: 'mobile1' } };

const LoginTemplate = (args) => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-4 bg-gray-200">
      <button onClick={() => setIsOpen(true)} className="rounded bg-black px-4 py-2 text-white">
        로그인 모달 열기
      </button>
      <LoginModal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)} onLogin={() => { alert('로그인 이동'); setIsOpen(false); }} />
    </div>
  );
};

export const Login_Desktop = LoginTemplate.bind({});
Login_Desktop.args = {};

export const Login_Mobile = LoginTemplate.bind({});
Login_Mobile.args = { forceMobile: true };
Login_Mobile.parameters = { viewport: { defaultViewport: 'mobile1' } };
