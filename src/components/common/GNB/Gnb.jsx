import Link from "next/link";
import BellEmpty from "@/assets/icons/ic-bell-empty.svg";
import BellNoti from "@/assets/icons/ic-bell-noti.svg";
import ProfileMember from "@/assets/icons/ic-profile-member.svg";
import ProfileAdmin from "@/assets/icons/ic-profile-admin.svg";
import Logo from "@/assets/icons/ic-logo.svg";

import { cn } from "@/lib/utils";

export default function Gnb({
  isLoggedIn = false,
  role = 'guest', // guest | member | admin
  hasNotification = false,
}) {
  const BellIcon = hasNotification ? BellNoti : BellEmpty;
  const ProfileIcon = role === 'admin' ? ProfileAdmin : ProfileMember;
  const isAdmin = role === 'admin';

  return (
    <header className="flex h-[60px] items-center border-b border-[var(--gray-200)] bg-white">
      <div className="container flex h-full items-center gap-6">
        {/* Left */}
        <Link href="/wip" className="inline-flex shrink-0 items-center gap-2">
          <Logo className={cn("h-[20.25px] w-[17.55px]", "max-[600px]:h-[13.5px] max-[600px]:w-[11.7px]")} />
          <span className="font-14-bold text-[var(--gray-900)]">Docthru</span>
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
