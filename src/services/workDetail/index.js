// Mock/API 전환 스위치

import * as mockWorkService from './mockWorkService';
import * as apiWorkService from './apiWorkService';

const USE_API = true;

const workService = USE_API ? apiWorkService : mockWorkService;

export const {
  getWorkDetail,
  toggleLike,
  createFeedback,
  loadMoreFeedbacks,
  updateWork,
  deleteWork,
} = workService;