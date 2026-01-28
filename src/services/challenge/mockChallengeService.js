// Mock Challenge Service
// 실제 API 없이 Mock 데이터로 동작

import { challengeDetailMockData } from '@/mocks/challengeDetailData';

// 테스트할 Mock 데이터 타입 선택
// liveChallenge, workingChallenge, closedSingleTop, closedMultipleTop, recruitClosed, fewParticipants, noParticipants
const MOCK_DATA_TYPE = 'recruitClosed';

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
  console.log('[Mock] deleteChallengeAsAdmin 호출:', challengeId, reason);
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
