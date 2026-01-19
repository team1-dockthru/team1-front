"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import BellEmpty from "@/assets/icons/ic-bell-empty.svg";
import BellNoti from "@/assets/icons/ic-bell-noti.svg";
import ProfileMember from "@/assets/icons/ic-profile-member.svg";
import ProfileAdmin from "@/assets/icons/ic-profile-admin.svg";
import Logo from "@/assets/icons/ic-logo.svg";
import ToggleDown from "@/assets/icons/ic-toggle-down.svg";

import { cn } from "@/lib/utils";

const DEV_PAGES = [
  { name: "스타일 가이드", href: "/wip" },
  { name: "비회원 페이지", href: "/" },
  { name: "회원 페이지", href: "/wip" },
  { name: "나의 챌린지", href: "/wip" },
  { name: "챌린지 상세", href: "/wip" },
  { name: "작업물 페이지", href: "/wip" },
  { name: "작업 도전하기", href: "/wip" },
  { name: "관리자 페이지", href: "/wip" },
  { name: "챌린지 보기", href: "/wip" },
  { name: "관리자 작업물", href: "/wip" },
];

export default function Gnb({
  isLoggedIn = false,
  role = 'guest', // guest | member | admin
  hasNotification = false,
}) {
  const BellIcon = hasNotification ? BellNoti : BellEmpty;
  const ProfileIcon = role === 'admin' ? ProfileAdmin : ProfileMember;
  const isAdmin = role === 'admin';

  const [isDevMenuOpen, setIsDevMenuOpen] = useState(false);
  const devMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (devMenuRef.current && !devMenuRef.current.contains(event.target)) {
        setIsDevMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="flex h-[60px] items-center border-b border-[var(--gray-200)] bg-white">
      <div className="mx-auto flex h-full w-full max-w-[1200px] items-center gap-6 px-6">
        {/* Left */}
        <Link href="/wip" className="inline-flex shrink-0 items-center gap-2">
          <Logo className={cn("h-[20.25px] w-[17.55px]", "max-[600px]:h-[13.5px] max-[600px]:w-[11.7px]")} />
          <span className="font-logo">Docthru</span>
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
        <div className="ml-auto inline-flex items-center gap-3">
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
              <Link href="/wip" className="inline-flex h-8 w-8 items-center justify-center" aria-label="알림">
                <BellIcon className="h-6 w-6" />
              </Link>
              <Link href="/wip" className="inline-flex h-8 w-8 items-center justify-center" aria-label="프로필">
                <ProfileIcon className="h-6 w-6" />
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
