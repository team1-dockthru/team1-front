'use client';

import List from './List';
import ListItem from './ListItem';
import Chip from '../Chip/Chip';

import ExitIcon from '@/assets/icons/ic-exit.svg';

export default {
  title: 'Molecule/List',
  component: List,
};

export function Basic() {
  return (
    <div style={{ padding: 24, width: 520 }}>
      <List>
        <ListItem
          left={<Chip variant="type-nextjs">Next.js</Chip>}
          title="Next.js 공식 문서 읽기"
          subtitle="라우팅/레이아웃 정리"
          meta="좋아요 12"
          action={
            <>
              작업물 보기 <ExitIcon className="h-4 w-4" />
            </>
          }
          onClick={() => {}}
        />
        <ListItem
          left={<Chip variant="type-api">API</Chip>}
          title="API 명세 검토"
          subtitle="에러 케이스 정리"
          meta="좋아요 3"
          onClick={() => {}}
        />
      </List>
    </div>
  );
}

