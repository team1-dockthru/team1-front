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
      nickname: '럽윈즈올',
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
        nickname: '개발life',
        rank: 1,
        likeCount: 1934,
        role: '전문가',
      },
      {
        userId: 'user_102',
        nickname: '라우터장인',
        rank: 2,
        likeCount: 1800,
        role: '전문가',
      },
      {
        userId: 'user_103',
        nickname: 'DevCat99',
        rank: 3,
        likeCount: 700,
        role: '전문가',
      },
      {
        userId: 'user_104',
        nickname: 'ts_master',
        rank: 4,
        likeCount: 600,
        role: '일반',
      },
      {
        userId: 'user_105',
        nickname: '사피엔스',
        rank: 5,
        likeCount: 500,
        role: '일반',
      },
      {
        userId: 'user_106',
        nickname: '개발나라',
        rank: 6,
        likeCount: 343,
        role: '전문가',
      },
      {
        userId: 'user_107',
        nickname: '넥스트트',
        rank: 7,
        likeCount: 256,
        role: '일반',
      },
      {
        userId: 'user_108',
        nickname: '타임아웃',
        rank: 8,
        likeCount: 250,
        role: '전문가',
      },
      {
        userId: 'user_109',
        nickname: '아마추어',
        rank: 9,
        likeCount: 180,
        role: '일반',
      },
      {
        userId: 'user_110',
        nickname: '주니어죽',
        rank: 10,
        likeCount: 179,
        role: '일반',
      },
      {
        userId: 'user_111',
        nickname: '곰탱이',
        rank: 11,
        likeCount: 133,
        role: '일반',
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
      nickname: '럽윈즈올',
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
        nickname: '개발life',
        rank: 1,
        likeCount: 1934,
        role: '전문가',
      },
      {
        userId: 'user_102',
        nickname: '라우터장인',
        rank: 2,
        likeCount: 1800,
        role: '전문가',
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
      nickname: '럽윈즈올',
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
          nickname: '개발life',
        },
        likeCount: 1934,
        content: '일반적으로 개발자는 애플리케이션 또는 웹사이트를 구축할 때, 앱의 다양한 영역에 대한 경로를 생성할 수 있는 방법이 필요합니다...일반적으로 개발자는 애플리케이션 또는 웹사이트를 구축할 때, 앱의 다양한 영역에 대한 경로를 생성할 수 있는 방법이 필요합니다...일반적으로 개발자는 애플리케이션 또는 웹사이트를 구축할 때, 앱의 다양한 영역에 대한 경로를 생성할 수 있는 방법이 필요합니다...일반적으로 개발자는 애플리케이션 또는 웹사이트를 구축할 때, 앱의 다양한 영역에 대한 경로를 생성할 수 있는 방법이 필요합니다...일반적으로 개발자는 애플리케이션 또는 웹사이트를 구축할 때, 앱의 다양한 영역에 대한 경로를 생성할 수 있는 방법이 필요합니다...일반적으로 개발자는 애플리케이션 또는 웹사이트를 구축할 때, 앱의 다양한 영역에 대한 경로를 생성할 수 있는 방법이 필요합니다...일반적으로 개발자는 애플리케이션 또는 웹사이트를 구축할 때, 앱의 다양한 영역에 대한 경로를 생성할 수 있는 방법이 필요합니다...일반적으로 개발자는 애플리케이션 또는 웹사이트를 구축할 때, 앱의 다양한 영역에 대한 경로를 생성할 수 있는 방법이 필요합니다...일반적으로 개발자는 애플리케이션 또는 웹사이트를 구축할 때, 앱의 다양한 영역에 대한 경로를 생성할 수 있는 방법이 필요합니다...일반적으로 개발자는 애플리케이션 또는 웹사이트를 구축할 때, 앱의 다양한 영역에 대한 경로를 생성할 수 있는 방법이 필요합니다...일반적으로 개발자는 애플리케이션 또는 웹사이트를 구축할 때, 앱의 다양한 영역에 대한 경로를 생성할 수 있는 방법이 필요합니다...일반적으로 개발자는 애플리케이션 또는 웹사이트를 구축할 때, 앱의 다양한 영역에 대한 경로를 생성할 수 있는 방법이 필요합니다...일반적으로 개발자는 애플리케이션 또는 웹사이트를 구축할 때, 앱의 다양한 영역에 대한 경로를 생성할 수 있는 방법이 필요합니다...일반적으로 개발자는 애플리케이션 또는 웹사이트를 구축할 때, 앱의 다양한 영역에 대한 경로를 생성할 수 있는 방법이 필요합니다...일반적으로 개발자는 애플리케이션 또는 웹사이트를 구축할 때, 앱의 다양한 영역에 대한 경로를 생성할 수 있는 방법이 필요합니다...일반적으로 개발자는 애플리케이션 또는 웹사이트를 구축할 때, 앱의 다양한 영역에 대한 경로를 생성할 수 있는 방법이 필요합니다...일반적으로 개발자는 애플리케이션 또는 웹사이트를 구축할 때, 앱의 다양한 영역에 대한 경로를 생성할 수 있는 방법이 필요합니다...일반적으로 개발자는 애플리케이션 또는 웹사이트를 구축할 때, 앱의 다양한 영역에 대한 경로를 생성할 수 있는 방법이 필요합니다...일반적으로 개발자는 애플리케이션 또는 웹사이트를 구축할 때, 앱의 다양한 영역에 대한 경로를 생성할 수 있는 방법이 필요합니다...일반적으로 개발자는 애플리케이션 또는 웹사이트를 구축할 때, 앱의 다양한 영역에 대한 경로를 생성할 수 있는 방법이 필요합니다...일반적으로 개발자는 애플리케이션 또는 웹사이트를 구축할 때, 앱의 다양한 영역에 대한 경로를 생성할 수 있는 방법이 필요합니다...',
        createdAt: '2024/01/14 12:02',
      },
    ],
    participants: [
      {
        userId: 'user_101',
        nickname: '개발life',
        rank: 1,
        likeCount: 1934,
        role: '전문가',
      },
      {
        userId: 'user_102',
        nickname: '라우터장인',
        rank: 2,
        likeCount: 1800,
        role: '전문가',
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
      nickname: '럽윈즈올',
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
          nickname: '개발life',
        },
        likeCount: 1934,
        content: 
        `일반적으로 개발자는 일련의 하드 스킬을 가지고 있어야 커리어에서 경력과 전문성을 쌓을 수 있습니다. 하지만 이에 못지 않게 개인 브랜드 구축도 만족스럽고 성취감 있는 경력을 쌓기 위해 중요하며 이를 쌓기는 더 어려울 수 있습니다.

          다른 사람들과의 차별화
          신뢰감을 줄 수 있음
          인맥을 쌓을 수 있는 기회
          이름을 알릴 수 있음

          이렇게 개인 브랜드는 경력을 결정짓는 수많은 중요한 방법으로 여러분을 도울 수 있습니다. 하지만 본인의 실력을 뽐내는 데 익숙하지 않거나 마케팅 개념에 한 번도 접근해보지 않은 사람은 브랜드 구축을 부담스럽거나 어렵게 느낄 수 있습니다. 이 가이드에서는 브랜드 구축을 위한 몇 가지 실용적인 전략을 소개합니다!

          자신의 야망과 편안한 수준을 고려하기
          10년 후 내가 꿈꾸는 직책은 무엇일까 생각해 보기
          자신의 구체적인 목표에 맞게 계획을 세워보기
          자신의 직업적 목표에 집중할 수 있도록 도움을 줄 수 있는 관리자나 커리어 카운슬러와 상담하기

          나만의 열정과 지식을 담아내기
          자신의 직업에서 실제로 가장 좋아하는 점을 생각해 보기
          그것에 대해 얘기해보고 브랜드의 주제로 삼기

          온라인에서 존재감 만들기
          LinkedIn: 페이지가 최신 상태인지, 눈길을 끄는지, 나를 가장 잘 표현하는지 확인하기
          Github: 프로필을 활성 상태로 유지하기, 오픈 소스 기여와 개인 프로젝트 소개하기
          나만의 웹사이트 구축하기

          측정 및 적응
          Google 애널리틱스 같은 도구를 사용해 웹사이트와 콘텐츠의 성과를 확인하기
          오프라인 인맥 구축 노력에 대한 데이터 수집해 보기`,

        createdAt: '2024/01/14 12:02',
      },
      {
        workId: 'work_102',
        author: {
          userId: 'user_102',
          nickname: '라우터장인',
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
        nickname: '개발life',
        rank: 1,
        likeCount: 1934,
        role: '전문가',
      },
      {
        userId: 'user_102',
        nickname: '라우터장인',
        rank: 1,
        likeCount: 1934,
        role: '전문가',
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
      nickname: '럽윈즈올',
    },
    status: 'recruitClosed',
    deadline: '2026년 3월 4일 마감',
    participantCount: 5,
    originalWorkId: 'work_001',
    isMine: false,
    isParticipating: false,
    topTranslations: [],
    participants: [
      {
        userId: 'user_101',
        nickname: '개발life',
        rank: 1,
        likeCount: 1934,
        role: '전문가',
      },
      {
        userId: 'user_102',
        nickname: '라우터장인',
        rank: 2,
        likeCount: 1800,
        role: '전문가',
      },
      {
        userId: 'user_103',
        nickname: 'DevCat99',
        rank: 3,
        likeCount: 700,
        role: '전문가',
      },
      {
        userId: 'user_104',
        nickname: 'ts_master',
        rank: 4,
        likeCount: 600,
        role: '일반',
      },
      {
        userId: 'user_105',
        nickname: '사피엔스',
        rank: 5,
        likeCount: 500,
        role: '일반',
      },
      {
        userId: 'user_106',
        nickname: '개발나라',
        rank: 6,
        likeCount: 343,
        role: '전문가',
      },
      {
        userId: 'user_107',
        nickname: '넥스트트',
        rank: 7,
        likeCount: 256,
        role: '일반',
      },
      {
        userId: 'user_108',
        nickname: '타임아웃',
        rank: 8,
        likeCount: 250,
        role: '전문가',
      },
      {
        userId: 'user_109',
        nickname: '아마추어',
        rank: 9,
        likeCount: 180,
        role: '일반',
      },
      {
        userId: 'user_110',
        nickname: '주니어죽',
        rank: 10,
        likeCount: 179,
        role: '일반',
      },
      {
        userId: 'user_111',
        nickname: '곰탱이',
        rank: 11,
        likeCount: 133,
        role: '일반',
      },
      {
        userId: 'user_112',
        nickname: 'cla22',
        rank: 12,
        likeCount: 110,
        role: '전문가',
      },
      {
        userId: 'user_113',
        nickname: '낙서장',
        rank: 13,
        likeCount: 108,
        role: '일반',
      },
      {
        userId: 'user_114',
        nickname: '소화불량',
        rank: 14,
        likeCount: 98,
        role: '일반',
      },
      {
        userId: 'user_115',
        nickname: '노트북',
        rank: 15,
        likeCount: 53,
        role: '일반',
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
      nickname: '럽윈즈올',
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
        nickname: '개발life',
        rank: 1,
        likeCount: 1934,
      },
      {
        userId: 'user_102',
        nickname: '라우터장인',
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