// 작업물 페이지 Mock 데이터

export const workDetailMockData = {
  // Empty State: 내 작업물 내용 없음
  emptyWorkMine: {  
    workId: 'work_empty_mine',
    title: '테스트 작성글입니다 (내 작업물)',
    type: 'Next.js',
    category: '공식문서',
    author: {
      userId: 'current_user',
      nickname: '내닉네임',
      profileImage: null,
    },
    likes: {
      count: 0,
      isLiked: false,
    },
    createdAt: '24/02/28',
    content: null, 
    feedbacks: [],
    totalFeedbackCount: 0,
    isMine: true, // ← 내 작업물 (수정/삭제 버튼 표시)
  },

  // Empty State: 다른 유저 작업물 내용 없음 
  emptyWorkOther: {
    workId: 'work_empty_other',
    title: '테스트 작성글입니다 (다른 유저)',
    type: 'Career',
    category: '블로그',
    author: {
      userId: 'user_999',
      nickname: '다른사람',
      profileImage: null,
    },
    likes: {
      count: 0,
      isLiked: false,
    },
    createdAt: '24/02/28',
    content: null,  
    feedbacks: [],
    totalFeedbackCount: 0,
    isMine: false,  // ← 수정/삭제 버튼 숨김
  },

  // 다른 유저의 작업물: isMine = false 
  withDataOtherUser: {
    workId: 'work_001',
    title: '테스트 작성글입니다 2',
    type: 'API',
    category: '공식문서',
    author: {
      userId: 'user_001',
      nickname: '김민수',
      profileImage: null,
    },
    likes: {
      count: 1934,
      isLiked: false,
    },
    createdAt: '24/02/28',
    content: `테스트 작성글 내용입니다`,
    feedbacks: [
      {
        feedbackId: 'feedback_001',
        author: {
          userId: 'user_002',
          nickname: '김은지',
          profileImage: null,
        },
        content:
          '테스트 피드백 댓글입니다 1',
        createdAt: '24/01/14 12:02',
      },
      {
        feedbackId: 'feedback_002',
        author: {
          userId: 'user_003',
          nickname: '서울예찬',
          profileImage: null,
        },
        content: '테스트 피드백 댓글입니다 2',
        createdAt: '24/01/14 11:58',
      },
      {
        feedbackId: 'feedback_003',
        author: {
          userId: 'user_004',
          nickname: '민주',
          profileImage: null,
        },
        content:
          '테스트 피드백 댓글입니다 3',
        createdAt: '24/01/14 11:42',
      },
      {
        feedbackId: 'feedback_004',
        author: {
          userId: 'user_005',
          nickname: '테스트유저4',
          profileImage: null,
        },
        content: '추가 피드백 테스트 4',
        createdAt: '24/01/14 11:30',
      },
      {
        feedbackId: 'feedback_005',
        author: {
          userId: 'user_006',
          nickname: '테스트유저5',
          profileImage: null,
        },
        content: '추가 피드백 테스트 5',
        createdAt: '24/01/14 11:20',
      },
    ],
    totalFeedbackCount: 5,
    isMine: false,
  },

  // 내 작업물: isMine = true 
  withDataMyWork: {
    workId: 'work_002',
    title: '테스트 작성글입니다 3',
    type: 'Web',
    category: '블로그',
    author: {
      userId: 'current_user',
      nickname: '내닉네임',
      profileImage: null,
    },
    likes: {
      count: 1934,
      isLiked: false,
    },
    createdAt: '24/02/28',
    content: `테스트 작성글 내용입니다`,
    feedbacks: [
      {
        feedbackId: 'feedback_101',
        author: {
          userId: 'user_007',
          nickname: '댓글작성자1',
          profileImage: null,
        },
        content: '테스트 댓그으으을',
        createdAt: '24/01/14 14:20',
      },
    ],
    totalFeedbackCount: 1,
    isMine: true,
  },
};

// 현재 로그인한 사용자 정보 (Mock)
export const currentUserMock = {
  userId: 'current_user',
  nickname: '내닉네임',
  profileImage: null,
};