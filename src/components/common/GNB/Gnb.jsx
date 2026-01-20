"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import BellEmpty from "@/assets/icons/ic-bell-empty.svg";
import BellNoti from "@/assets/icons/ic-bell-noti.svg";
import ProfileMember from "@/assets/icons/ic-profile-member.svg";
import ProfileAdmin from "@/assets/icons/ic-profile-admin.svg";
import Logo from "@/assets/icons/ic-logo.svg";
import ToggleDown from "@/assets/icons/ic-toggle-down.svg";
import Container from "@/components/common/Container/Container";

import { cn } from "@/lib/utils";
import NotificationModal from "@/components/common/NotificationModal/NotificationModal";

const DEV_PAGES = [
  { name: "스타일 가이드", href: "/style-guide" },
  { name: "챌린지 보기", href: "/challenges-show" },
  { name: "나의 챌린지", href: "/wip" },
  { name: "챌린지 상세", href: "/wip" },
  { name: "작업물 페이지", href: "/workDetail/work_001" },
  { name: "작업 도전하기", href: "/wip" },
  { name: "관리자 페이지", href: "/wip" },
  { name: "관리자 작업물", href: "/wip" },
];

export default function Gnb({
  isLoggedIn = true, // 데모를 위해 true로 변경 (또는 프롭으로 조절)
  role = 'member', // guest | member | admin
  hasNotification = true, // 데모를 위해 true로 변경
  notifications = [], // 알림 목록 데이터
}) {
  const BellIcon = hasNotification ? BellNoti : BellEmpty;
  const ProfileIcon = role === 'admin' ? ProfileAdmin : ProfileMember;
  const isAdmin = role === 'admin';

  const [isDevMenuOpen, setIsDevMenuOpen] = useState(false);
  const [isNotiOpen, setIsNotiOpen] = useState(false);
  const devMenuRef = useRef(null);
  const notiRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (devMenuRef.current && !devMenuRef.current.contains(event.target)) {
        setIsDevMenuOpen(false);
      }
      if (notiRef.current && !notiRef.current.contains(event.target)) {
        setIsNotiOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="flex h-[60px] items-center border-b border-[var(--gray-200)] bg-white">
      <Container className="flex h-full items-center gap-6">
        {/* Left */}
        <Link href="/" className="inline-flex shrink-0 items-center gap-2">
          <Logo className={cn("h-[20.25px] w-[17.55px]", "max-[600px]:h-[13.5px] max-[600px]:w-[11.7px]")} />
          <span className="font-logo text-[22.68px]">Docthru</span>
        </Link>

        {/* Admin menu */}
        {isAdmin ? (
          <nav className="inline-flex flex-1 items-center gap-6">
            <Link className="font-14-semibold text-[var(--gray-900)]" href="/wip">
              챌린지 관리
            </Link>
            <Link className="font-14-medium text-[var(--gray-700)]" href="/wip">
              챌린지 목록
            </Link>
          </nav>
        ) : (
          <div className="flex-1" />
        )}

        {/* Right */}
        <div className="ml-auto inline-flex items-center gap-4">
          {/* Dev Dropdown */}
          <div className="relative" ref={devMenuRef}>
            <button
              onClick={() => setIsDevMenuOpen(!isDevMenuOpen)}
              className={cn(
                "font-14-medium inline-flex h-8 w-28 items-center justify-between px-3 rounded-[10px] border border-[var(--gray-800)] bg-white text-[var(--gray-900)]",
                "hover:bg-[var(--gray-50)]"
              )}
            >
              <span>미리보기</span>
              <ToggleDown className={cn("h-4 w-4 transition-transform", isDevMenuOpen && "rotate-180")} />
            </button>
            {isDevMenuOpen && (
              <div className="absolute right-0 top-full z-50 mt-2 w-[160px] overflow-hidden rounded-lg border border-[var(--gray-200)] bg-white shadow-lg">
                <ul className="py-1">
                  {DEV_PAGES.map((page) => (
                    <li key={page.name}>
                      <Link
                        href={page.href}
                        onClick={() => setIsDevMenuOpen(false)}
                        className="block px-4 py-2 text-center text-sm text-[var(--gray-700)] hover:bg-[var(--gray-50)]"
                      >
                        {page.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {!isLoggedIn ? (
            <Link
              href="/wip"
              className={cn(
                "font-14-medium inline-flex h-8 w-20 items-center justify-center rounded-[10px] border border-[var(--gray-800)] bg-white text-[var(--gray-900)]",
                "hover:bg-[var(--gray-50)]"
              )}
            >
              로그인
            </Link>
          ) : (
            <>
              {/* Notifications */}
              <div className="relative" ref={notiRef}>
                <button
                  type="button"
                  onClick={() => setIsNotiOpen(!isNotiOpen)}
                  className="flex h-8 w-8 items-center justify-center transition-opacity hover:opacity-80"
                  aria-label="알림"
                >
                  <BellIcon className="h-6 w-6" />
                </button>
                {isNotiOpen && (
                  <div className="absolute right-0 top-full z-50 mt-2">
                    <NotificationModal notifications={notifications} />
                  </div>
                )}
              </div>

              <Link href="/wip" className="flex h-8 w-8 items-center justify-center" aria-label="프로필">
                <ProfileIcon className="h-8 w-8" />
              </Link>
            </>
          )}
        </div>
      </Container>
    </header>
  );
}
