'use client';

import Gnb from './Gnb';

export default {
  title: 'Layout/GNB',
  component: Gnb,
  parameters: {
    layout: 'fullscreen',
  },
};

export function Guest() {
  return <Gnb isLoggedIn={false} role="guest" hasNotification={false} />;
}

export function Member_NoNoti() {
  return <Gnb isLoggedIn role="member" hasNotification={false} />;
}

export function Member_WithNoti() {
  return <Gnb isLoggedIn role="member" hasNotification />;
}

export function Admin() {
  return <Gnb isLoggedIn role="admin" hasNotification />;
}

