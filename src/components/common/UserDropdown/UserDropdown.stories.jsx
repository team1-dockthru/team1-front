'use client';

import UserDropdown from './UserDropdown';

export default {
  title: 'Molecule/UserDropdown',
  component: UserDropdown,
  parameters: {
    layout: 'centered',
  },
};

export const Default = {
  args: {
    user: {
      name: '체다치즈',
      role: '전문가',
    },
    onMyChallenge: () => console.log('나의 챌린지 클릭'),
    onLogout: () => console.log('로그아웃 클릭'),
  },
  render: (args) => (
    <div className="flex h-[300px] w-[400px] items-start justify-end p-10 bg-gray-100 rounded-lg">
      <UserDropdown {...args} />
    </div>
  ),
};

export const AdminUser = {
  args: {
    user: {
      name: '관리자님',
      role: '어드민',
    },
    onMyChallenge: () => console.log('나의 챌린지 클릭'),
    onLogout: () => console.log('로그아웃 클릭'),
  },
  render: (args) => (
    <div className="flex h-[300px] w-[400px] items-start justify-end p-10 bg-gray-100 rounded-lg">
      <UserDropdown {...args} />
    </div>
  ),
};
