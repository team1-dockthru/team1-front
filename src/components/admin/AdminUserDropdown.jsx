'use client';

import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import ProfileIcon from '@/assets/icons/ic-profile-member.svg';
import AdminProfileIcon from '@/assets/icons/ic-profile-admin.svg';

export default function AdminUserDropdown({
  user = { name: '체다치즈', role: '어드민' },
  onApprovalPending,
  onLogout,
  className,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggle = () => setIsOpen((prev) => !prev);

  const isAdmin = user.role === '어드민' || user.role === '관리자';
  const ActiveIcon = isAdmin ? AdminProfileIcon : ProfileIcon;

  return (
    <div className={cn('relative inline-block', className)} ref={containerRef}>
      <button
        type="button"
        onClick={handleToggle}
        className={cn(
          'flex h-10 w-10 items-center justify-center rounded-full overflow-hidden',
          'transition-transform hover:scale-105 active:scale-95'
        )}
      >
        <ActiveIcon className="size-full" />
      </button>

      {isOpen && (
        <div 
          className={cn(
            'absolute right-0 top-[calc(100%+12px)] z-50 w-[200px]',
            'overflow-hidden rounded-2xl bg-white p-4 shadow-xl border border-[var(--gray-100)]'
          )}
        >
          <div className="flex items-center gap-3 pb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full overflow-hidden">
              <ActiveIcon className="size-full" />
            </div>
            <div className="flex flex-col">
              <span className="font-16-semibold text-[var(--gray-900)]">{user.name}</span>
              <span className="font-12-regular text-[var(--gray-500)]">{user.role}</span>
            </div>
          </div>

          <div className="mb-2 h-px w-full bg-[var(--gray-100)]" />

          <ul className="m-0 flex list-none flex-col gap-1 p-0">
            <li>
              <button
                type="button"
                onClick={() => {
                  if (onApprovalPending) onApprovalPending();
                  setIsOpen(false);
                }}
                className={cn(
                  'flex w-full items-center rounded-lg py-2 px-1 text-left',
                  'font-16-regular text-[var(--gray-700)] hover:bg-[var(--gray-50)]'
                )}
              >
                승인 대기
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => {
                  if (onLogout) onLogout();
                  setIsOpen(false);
                }}
                className={cn(
                  'flex w-full items-center rounded-lg py-1 px-1 text-left',
                  'font-16-regular text-[var(--gray-400)] hover:bg-[var(--gray-50)]'
                )}
              >
                로그아웃
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

