"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import BellEmpty from "@/assets/icons/ic-bell-empty.svg";
import BellNoti from "@/assets/icons/ic-bell-noti.svg";
import ProfileMember from "@/assets/icons/ic-profile-member.svg";
import ProfileAdmin from "@/assets/icons/ic-profile-admin.svg";
import Logo from "@/assets/icons/ic-logo.svg";
import ToggleDown from "@/assets/icons/ic-toggle-down.svg";
import Container from "@/components/common/Container/Container";
import UserDropdown from "@/components/common/UserDropdown/UserDropdown";

import { cn } from "@/lib/utils";
import NotificationModal from "@/components/common/NotificationModal/NotificationModal";
import { logout } from "@/services/user";
import { useAuthStore } from "@/store/authStore";
import { markNotificationRead } from "@/services/notification";

const DEV_PAGES = [
  { name: "스타일 가이드", href: "/style-guide" },
  { name: "챌린지 보기", href: "/challenges-show" },
  { name: "나의 챌린지", href: "/challenges-my" },
  { name: "챌린지 상세", href: "/wip" },
  { name: "작업물 페이지", href: "/workDetail/work_001" },
  { name: "작업 도전하기", href: "/wip" },
  { name: "관리자 페이지", href: "/wip" },
  { name: "관리자 작업물", href: "/wip" },
];

export default function Gnb({
  isLoggedIn = true, // 데모를 위해 true로 변경 (또는 프롭으로 조절)
  role = 'member', // guest | member | admin
  hasNotification = false,
  notifications = [], // 알림 목록 데이터
  useUserDropdown = false,
  userDropdownProps,
  user,
  onLogout,
  onMyChallenge,
}) {
  const router = useRouter();
  const clearToken = useAuthStore((state) => state.clearToken);
  const [localNotifications, setLocalNotifications] = useState(notifications);
  const derivedHasNotification =
    typeof hasNotification === "boolean" ? hasNotification : notifications.length > 0;
  const lastNotificationsSigRef = useRef("");

  useEffect(() => {
    const signature = notifications
      .map((noti, index) =>
        [
          noti?.id ?? index,
          noti?.readAt ?? "",
          noti?.createdAt ?? "",
          noti?.message ?? "",
          noti?.content ?? "",
          noti?.date ?? "",
        ].join("|")
      )
      .join("||");

    if (lastNotificationsSigRef.current !== signature) {
      lastNotificationsSigRef.current = signature;
      setLocalNotifications(notifications);
    }
  }, [notifications]);
  const BellIcon = derivedHasNotification ? BellNoti : BellEmpty;
  const ProfileIcon = role === 'admin' ? ProfileAdmin : ProfileMember;
  const isAdmin = role === 'admin';
  const displayUserName = user?.nickname || user?.name || userDropdownProps?.user?.name || '사용자';
  const displayUserRole = role === 'admin' ? '관리자' : (userDropdownProps?.user?.role || '일반');
  const shouldUseUserDropdown = useUserDropdown || Boolean(user || onLogout || onMyChallenge);
  const resolvedUserDropdownProps = {
    user: userDropdownProps?.user || { name: displayUserName, role: displayUserRole },
    ...userDropdownProps,
    onMyChallenge:
      userDropdownProps?.onMyChallenge ||
      onMyChallenge ||
      (() => router.push("/challenges-my")),
    onLogout:
      userDropdownProps?.onLogout ||
      onLogout ||
      (async () => {
        try {
          await logout();
        } catch (error) {
          alert(error.message || "로그아웃에 실패했습니다.");
          return;
        }
        clearToken();
        window.location.href = "/";
      }),
  };

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
    <header className="flex h-[60px] items-center border-b border-[var(--gray-200)] bg-white px-4 md:px-0">
      <Container className="flex h-full w-full max-w-none items-center gap-3 md:gap-6 md:max-w-[990px]">
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
          <div className="relative hidden md:block" ref={devMenuRef}>
            <button
              onClick={() => setIsDevMenuOpen(!isDevMenuOpen)}
              className={cn(
                "font-14-medium inline-flex h-8 w-24 md:w-28 items-center justify-between px-2 md:px-3 rounded-[10px] border border-[var(--gray-800)] bg-white text-[var(--gray-900)]",
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
              href="/login"
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
                  className="flex h-8 w-8 items-center justify-center transition-opacity hover:opacity-80 cursor-pointer"
                  aria-label="알림"
                >
                  <BellIcon className="h-6 w-6" />
                </button>
                {isNotiOpen && (
                  <div className="absolute right-0 top-full z-50 mt-2">
                    <NotificationModal
                      notifications={localNotifications}
                      onRead={async (noti) => {
                        if (!noti?.id) return;
                        try {
                          const result = await markNotificationRead(noti.id);
                          const readAt = result?.data?.readAt || new Date().toISOString();
                          setLocalNotifications((prev) =>
                            prev.map((item) =>
                              item.id === noti.id ? { ...item, readAt } : item
                            )
                          );
                        } catch (error) {
                          alert(error.message || "알림 읽음 처리에 실패했습니다.");
                        }
                      }}
                    />
                  </div>
                )}
              </div>

              {shouldUseUserDropdown && !isAdmin ? (
                <UserDropdown {...resolvedUserDropdownProps} />
              ) : (
                <Link href="/wip" className="flex h-8 w-8 items-center justify-center" aria-label="프로필">
                  <ProfileIcon className="h-8 w-8" />
                </Link>
              )}
            </>
          )}
        </div>
      </Container>
    </header>
  );
}
