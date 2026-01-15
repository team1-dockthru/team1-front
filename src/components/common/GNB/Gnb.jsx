import Link from 'next/link';
import BellEmpty from '@/assets/icons/ic-bell-empty.svg';
import BellNoti from '@/assets/icons/ic-bell-noti.svg';
import ProfileMember from '@/assets/icons/ic-profile-member.svg';
import ProfileAdmin from '@/assets/icons/ic-profile-admin.svg';
import Logo from '@/assets/icons/logo.svg';

import './gnb.css';

export default function Gnb({
  isLoggedIn = false,
  role = 'guest', // guest | member | admin
  hasNotification = false,
}) {
  const BellIcon = hasNotification ? BellNoti : BellEmpty;
  const ProfileIcon = role === 'admin' ? ProfileAdmin : ProfileMember;
  const isAdmin = role === 'admin';

  return (
    <header className="gnb">
      <div className="gnb__inner container">
        {/* Left */}
        <Link href="/wip" className="gnb__brand">
          <Logo className="gnb__logo" />
          <span className="gnb__title font-14-bold">Docthru</span>
        </Link>

        {/* Admin menu */}
        {isAdmin ? (
          <nav className="gnb__nav">
            <Link className="gnb__navItem font-14-semibold" href="/wip">
              챌린지 관리
            </Link>
            <Link className="gnb__navItem font-14-medium" href="/wip">
              챌린지 목록
            </Link>
          </nav>
        ) : (
          <div className="gnb__spacer" />
        )}

        {/* Right */}
        <div className="gnb__right">
          {!isLoggedIn ? (
            <Link href="/wip" className="gnb__loginBtn font-14-medium">
              로그인
            </Link>
          ) : (
            <>
              <Link href="/wip" className="gnb__iconBtn" aria-label="알림">
                <BellIcon className="gnb__iconSvg" />
              </Link>
              <Link href="/wip" className="gnb__iconBtn" aria-label="프로필">
                <ProfileIcon className="gnb__iconSvg" />
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
