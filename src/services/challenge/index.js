// Challenge Service 스위치
// Mock/API 전환만 담당

import * as mockChallengeService from './mockChallengeService';
import * as apiChallengeService from './apiChallengeService';

const USE_API = true; // true: API 사용, false: Mock 사용

const challengeService = USE_API ? apiChallengeService : mockChallengeService;

export const {
  getChallengeDetail,
  getChallengeDetailRaw,
  joinChallenge,
  updateChallenge,
  deleteChallenge,
  deleteChallengeAsAdmin,
  processChallengeRequest,
  createChallengeRequest,
  getChallenges,
  getChallengeRequests,
  getChallengeRequestDetail,
} = challengeService;
