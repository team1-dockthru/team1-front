'use client';

import Gnb from '@/components/common/GNB/Gnb';

export default function AdminHeader({
  user = { name: '체다치즈', role: '어드민' },
  onLogout,
  ...gnbProps
}) {
  return (
    <Gnb
      {...gnbProps}
      isLoggedIn
      role="admin"
      useUserDropdown
      user={{ name: user?.name || '관리자', role: '관리자' }}
      onLogout={onLogout}
    />
  );
}

