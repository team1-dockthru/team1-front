'use client';

import { useEffect, useRef } from 'react';
import Gnb from '@/components/common/GNB/Gnb';
import AdminUserDropdown from '@/components/admin/AdminUserDropdown';

export default function AdminHeader({
  user = { name: '체다치즈', role: '어드민' },
  onApprovalPending,
  onLogout,
  ...gnbProps
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const challengeManagementLink = document.querySelector('nav a[href="/wip"]');
    if (challengeManagementLink && challengeManagementLink.textContent?.trim() === '챌린지 관리') {
      challengeManagementLink.setAttribute('href', '/admin/challenge-application');
    }

    const profileLink = document.querySelector('a[aria-label="프로필"]');
    if (profileLink) {
      profileLink.style.display = 'none';
    }

    const rightSection = document.querySelector('header .ml-auto');
    if (rightSection) {
      rightSection.style.gap = '12px';
      rightSection.style.marginRight = '0';
    }

    const notificationButton = document.querySelector('button[aria-label="알림"]');
    if (notificationButton && containerRef.current) {
      const notificationRect = notificationButton.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();
      const dropdownContainer = containerRef.current.querySelector('#admin-user-dropdown-container');
      
      if (dropdownContainer) {
        const gap = 12;
        const rightOffset = containerRect.right - notificationRect.right - gap;
        dropdownContainer.style.right = `${rightOffset}px`;
      }
    }
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      <div className="[&_a[aria-label='프로필']]:hidden [&_.ml-auto]:!mr-0">
        <Gnb {...gnbProps} role="admin" />
      </div>
      <div 
        id="admin-user-dropdown-container"
        className="absolute top-0 h-[60px] flex items-center z-50"
        style={{
          right: '1rem',
        }}
      >
        <AdminUserDropdown
          user={user}
          onApprovalPending={onApprovalPending}
          onLogout={onLogout}
        />
      </div>
    </div>
  );
}

