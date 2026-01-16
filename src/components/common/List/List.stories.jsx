'use client';

import List from './List';
import ListItem from './ListItem';

import CrownIcon from '@/assets/icons/ic-crown.svg';
import ProfileIcon from '@/assets/icons/ic-profile-member.svg';
import HeartIcon from '@/assets/icons/ic-heart-active-l.svg';
import ArrowRightIcon from '@/assets/icons/ic-arrow-direction-active-right.svg';

export default {
  title: 'Molecule/List',
  component: List,
};

export function Basic() {
  const mockData = [
    {
      rank: '01',
      name: '개발life',
      role: '전문가',
      likes: '9,999...',
      isTop: true,
    },
    {
      rank: '02',
      name: '라우터장인',
      role: '전문가',
      likes: '1,800',
    },
    {
      rank: '03',
      name: 'DevCat99',
      role: '일반',
      likes: '700',
    },
  ];

  return (
    <div style={{ padding: 24, width: '100%', maxWidth: 800, backgroundColor: 'white' }}>
      <div className="rounded-xl border border-[var(--gray-200)] p-4 shadow-sm">
        <h3 className="font-18-bold mb-4 px-2">참여 현황</h3>
        <List>
          {mockData.map((item) => (
            <ListItem
              key={item.rank}
              left={
                <div className="flex items-center gap-4">
                  <div className="flex w-[60px] items-center justify-center gap-1 rounded-full bg-[var(--brand-black)] py-1 text-[var(--brand-yellow)]">
                    {item.isTop && <CrownIcon className="h-3 w-3" />}
                    <span className="font-14-bold">{item.rank}</span>
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--brand-yellow)]">
                    <ProfileIcon className="h-6 w-6 text-white" />
                  </div>
                </div>
              }
              title={item.name}
              subtitle={item.role}
              meta={
                <>
                  <HeartIcon className="h-5 w-5 text-[var(--brand-yellow)]" />
                  <span>{item.likes}</span>
                </>
              }
              action={
                <div className="flex items-center gap-1 cursor-pointer">
                  <span>작업물 보기</span>
                  <ArrowRightIcon className="h-5 w-5" />
                </div>
              }
              onClick={() => console.log(`${item.name} 클릭`)}
            />
          ))}
        </List>
      </div>
    </div>
  );
}

