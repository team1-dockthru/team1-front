// 챌린지 상세 페이지 Mock 데이터

export const challengeDetailMockData = {
  // 1. 라이브 중인 챌린지
  liveChallenge: {
    challengeId: 'challenge_001',
    title: 'Next.js - App Router : Routing Fundamentals',
    type: 'Next.js',
    category: '공식문서',
    description: 'Next.js App Router 공식 문서 중 Routing Fundamentals 내용입니다. 라우팅에 그치지 않고 앱 라우터의 구조적인 면에서 전반 이해를 돕는 내용을 전반적으로 다룹니다. (다른 챌린지 참여 중이면 해당 문서는 숨겨집니다.)',
    author: {
      userId: 'user_001',
      nickname: '챌린지주',
    },
    status: 'live', // live | working | closed | recruitClosed
    deadline: '2024년 2월 28일 마감',
    participantCount: 7,
    originalWorkId: 'work_001', // 원문보기 링크
    isMine: false,
    isParticipating: false, // 참여 중 여부
    topTranslations: [], // 최다 추천작 (마감 후에만)
    participants: [
      {
        userId: 'user_101',
        nickname: '개발자a',
        rank: 1,
        likeCount: 1934,
      },
      {
        userId: 'user_102',
        nickname: '개발자랩맨',
        rank: 2,
        likeCount: 1800,
      },
      {
        userId: 'user_103',
        nickname: 'DevCat99',
        rank: 3,
        likeCount: 700,
      },
      {
        userId: 'user_104',
        nickname: 'ts_master',
        rank: 4,
        likeCount: 600,
      },
      {
        userId: 'user_105',
        nickname: '서머신스',
        rank: 5,
        likeCount: 500,
      },
    ],
  },

  // 2. 라이브 중 + 작업 중인 챌린지
  workingChallenge: {
    challengeId: 'challenge_002',
    title: 'Next.js - App Router : Routing Fundamentals',
    type: 'Next.js',
    category: '공식문서',
    description: 'Next.js App Router 공식 문서 중 Routing Fundamentals 내용입니다.',
    author: {
      userId: 'user_001',
      nickname: '챌린지주',
    },
    status: 'working',
    deadline: '2024년 2월 28일 마감',
    participantCount: 7,
    originalWorkId: 'work_001',
    isMine: false,
    isParticipating: true, // 참여 중
    topTranslations: [],
    participants: [
      {
        userId: 'user_101',
        nickname: '개발자a',
        rank: 1,
        likeCount: 1934,
      },
      {
        userId: 'user_102',
        nickname: '개발자랩맨',
        rank: 2,
        likeCount: 1800,
      },
    ],
  },

  // 3. 마감된 챌린지 - 최다 추천작 1개
  closedSingleTop: {
    challengeId: 'challenge_003',
    title: 'Next.js - App Router : Routing Fundamentals',
    type: 'Next.js',
    category: '공식문서',
    description: 'Next.js App Router 공식 문서 중 Routing Fundamentals 내용입니다.',
    author: {
      userId: 'user_001',
      nickname: '챌린지주',
    },
    status: 'closed',
    deadline: '2024년 2월 28일 마감',
    participantCount: 5,
    originalWorkId: 'work_001',
    isMine: false,
    isParticipating: false,
    topTranslations: [
      {
        workId: 'work_101',
        author: {
          userId: 'user_101',
          nickname: '개발자a',
        },
        likeCount: 1934,
        content: '일반적으로 개발자는 애플리케이션 또는 웹사이트를 구축할 때, 앱의 다양한 영역에 대한 경로를 생성할 수 있는 방법이 필요합니다...(긴 내용)',
        createdAt: '2024/01/14 12:02',
      },
    ],
    participants: [
      {
        userId: 'user_101',
        nickname: '개발자a',
        rank: 1,
        likeCount: 1934,
      },
      {
        userId: 'user_102',
        nickname: '개발자랩맨',
        rank: 2,
        likeCount: 1800,
      },
    ],
  },

  // 4. 마감된 챌린지 - 최다 추천작 다수
  closedMultipleTop: {
    challengeId: 'challenge_004',
    title: 'Next.js - App Router : Routing Fundamentals',
    type: 'Next.js',
    category: '공식문서',
    description: 'Next.js App Router 공식 문서 중 Routing Fundamentals 내용입니다.',
    author: {
      userId: 'user_001',
      nickname: '챌린지주',
    },
    status: 'closed',
    deadline: '2024년 2월 28일 마감',
    participantCount: 5,
    originalWorkId: 'work_001',
    isMine: false,
    isParticipating: false,
    topTranslations: [
      {
        workId: 'work_101',
        author: {
          userId: 'user_101',
          nickname: '개발자a',
        },
        likeCount: 1934,
        content: '첫 번째 최다 추천작 내용...',
        createdAt: '2024/01/14 12:02',
      },
      {
        workId: 'work_102',
        author: {
          userId: 'user_102',
          nickname: '개발자랩맨',
        },
        likeCount: 1934,
        content: '두 번째 최다 추천작 내용...',
        createdAt: '2024/01/14 11:58',
      },
      {
        workId: 'work_103',
        author: {
          userId: 'user_103',
          nickname: 'DevCat99',
        },
        likeCount: 1934,
        content: '세 번째 최다 추천작 내용...',
        createdAt: '2024/01/14 11:42',
      },
    ],
    participants: [
      {
        userId: 'user_101',
        nickname: '개발자a',
        rank: 1,
        likeCount: 1934,
      },
      {
        userId: 'user_102',
        nickname: '개발자랩맨',
        rank: 1,
        likeCount: 1934,
      },
    ],
  },

  // 5. 모집 마감된 챌린지
  recruitClosed: {
    challengeId: 'challenge_005',
    title: 'Next.js - App Router : Routing Fundamentals',
    type: 'Next.js',
    category: '공식문서',
    description: 'Next.js App Router 공식 문서 중 Routing Fundamentals 내용입니다.',
    author: {
      userId: 'user_001',
      nickname: '챌린지주',
    },
    status: 'recruitClosed',
    deadline: '2024년 2월 28일 마감',
    participantCount: 5,
    originalWorkId: 'work_001',
    isMine: false,
    isParticipating: false,
    topTranslations: [],
    participants: [
      {
        userId: 'user_101',
        nickname: '개발자a',
        rank: 1,
        likeCount: 1934,
      },
    ],
  },

  // 6. 참여자 5명 이하
  fewParticipants: {
    challengeId: 'challenge_006',
    title: 'Next.js - App Router : Routing Fundamentals',
    type: 'Next.js',
    category: '공식문서',
    description: 'Next.js App Router 공식 문서 중 Routing Fundamentals 내용입니다.',
    author: {
      userId: 'user_001',
      nickname: '챌린지주',
    },
    status: 'live',
    deadline: '2024년 2월 28일 마감',
    participantCount: 2,
    originalWorkId: 'work_001',
    isMine: false,
    isParticipating: false,
    topTranslations: [],
    participants: [
      {
        userId: 'user_101',
        nickname: '개발자a',
        rank: 1,
        likeCount: 1934,
      },
      {
        userId: 'user_102',
        nickname: '개발자랩맨',
        rank: 2,
        likeCount: 1800,
      },
    ],
  },

  // 7. 참여자 없음
  noParticipants: {
    challengeId: 'challenge_007',
    title: 'Next.js - App Router : Routing Fundamentals',
    type: 'Next.js',
    category: '공식문서',
    description: 'Next.js App Router 공식 문서 중 Routing Fundamentals 내용입니다.',
    author: {
      userId: 'current_user',
      nickname: '내닉네임',
    },
    status: 'live',
    deadline: '2024년 2월 28일 마감',
    participantCount: 0,
    originalWorkId: 'work_001',
    isMine: true,
    isParticipating: false,
    topTranslations: [],
    participants: [],
  },
};

// 현재 로그인한 사용자 정보 (Mock)
export const currentUserMock = {
  userId: 'current_user',
  nickname: '내닉네임',
  profileImage: null,
};