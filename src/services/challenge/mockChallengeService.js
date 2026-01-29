// Mock Challenge Service
// 실제 API 없이 Mock 데이터로 동작

import { challengeDetailMockData } from '@/mocks/challengeDetailData';

// 테스트할 Mock 데이터 타입 선택
// liveChallenge, workingChallenge, closedSingleTop, closedMultipleTop, recruitClosed, fewParticipants, noParticipants
const MOCK_DATA_TYPE = 'recruitClosed';

const MOCK_CHALLENGES = [
  {
    id: 101,
    title: 'React 공식 문서 번역 챌린지',
    field: '프론트엔드',
    docType: 'OFFICIAL_DOCUMENT',
    deadlineAt: '2026-02-01T00:00:00.000Z',
    maxParticipants: 10,
    _count: { participants: 1 },
    challengeStatus: 'IN_PROGRESS',
    requestStatus: 'APPROVED',
  },
  {
    id: 102,
    title: 'Next.js App Router 문서 번역',
    field: 'Next.js',
    docType: 'OFFICIAL_DOCUMENT',
    deadlineAt: '2026-02-15T00:00:00.000Z',
    maxParticipants: 8,
    _count: { participants: 3 },
    challengeStatus: 'IN_PROGRESS',
    requestStatus: 'APPROVED',
  },
  {
    id: 103,
    title: 'Modern JS 심화 챌린지',
    field: 'Modern JS',
    docType: 'BLOG',
    deadlineAt: '2026-01-10T00:00:00.000Z',
    maxParticipants: 5,
    _count: { participants: 5 },
    challengeStatus: 'IN_PROGRESS',
    requestStatus: 'APPROVED',
  },
  {
    id: 104,
    title: 'Next.js App Router: Routing Fundamentals',
    field: 'Next.js',
    docType: 'OFFICIAL_DOCUMENT',
    deadlineAt: '2025-12-31T00:00:00.000Z',
    maxParticipants: 5,
    _count: { participants: 5 },
    challengeStatus: 'CLOSED',
    requestStatus: 'APPROVED',
  },
];

/**
 * 챌린지 상세 조회
 */
export async function getChallengeDetail(challengeId) {
  console.log('[Mock] getChallengeDetail 호출:', challengeId);
  
  // API 호출 시뮬레이션 (0.5초 지연)
  await new Promise((resolve) => setTimeout(resolve, 500));
  
  const mockData = challengeDetailMockData[MOCK_DATA_TYPE];
  
  console.log('[Mock] 반환 데이터:', mockData);
  return mockData;
}

export async function getChallengeDetailRaw(challengeId) {
  console.log('[Mock] getChallengeDetailRaw 호출:', challengeId);
  await new Promise((resolve) => setTimeout(resolve, 300));
  return {
    id: Number(challengeId),
    title: 'Mock 챌린지',
    sourceUrl: 'https://example.com',
    field: '프론트엔드',
    docType: 'OFFICIAL_DOCUMENT',
    deadlineAt: new Date().toISOString(),
    maxParticipants: 10,
    content: 'Mock 챌린지 내용입니다.',
  };
}

/**
 * 챌린지 참여하기
 */
export async function joinChallenge(challengeId) {
  console.log('[Mock] joinChallenge 호출:', challengeId);
  
  await new Promise((resolve) => setTimeout(resolve, 300));
  
  return {
    success: true,
    message: '챌린지에 참여했습니다.',
  };
}

/**
 * 챌린지 수정
 */
export async function updateChallenge(challengeId, data) {
  console.log('[Mock] updateChallenge 호출:', challengeId, data);
  
  await new Promise((resolve) => setTimeout(resolve, 300));
  
  return {
    success: true,
    message: '챌린지가 수정되었습니다.',
  };
}

/**
 * 챌린지 삭제
 */
export async function deleteChallenge(challengeId) {
  console.log('[Mock] deleteChallenge 호출:', challengeId);
  
  await new Promise((resolve) => setTimeout(resolve, 300));
  
  return {
    success: true,
    message: '챌린지가 삭제되었습니다.',
  };
}

export async function deleteChallengeAsAdmin(challengeId, reason) {
  const trimmedReason = typeof reason === 'string' ? reason.trim() : '';
  console.log('[Mock] deleteChallengeAsAdmin 호출:', challengeId, trimmedReason);
  await new Promise((resolve) => setTimeout(resolve, 300));
  return {
    success: true,
    message: '챌린지가 관리자에 의해 삭제되었습니다.',
  };
}

export async function processChallengeRequest(requestId, payload) {
  console.log('[Mock] processChallengeRequest 호출:', requestId, payload);
  await new Promise((resolve) => setTimeout(resolve, 300));
  return {
    success: true,
    message: '요청 상태가 변경되었습니다.',
  };
}

export async function getChallenges() {
  console.log('[Mock] getChallenges 호출');
  await new Promise((resolve) => setTimeout(resolve, 300));
  return MOCK_CHALLENGES;
}
