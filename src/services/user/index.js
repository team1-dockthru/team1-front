// Mock/API 전환 스위치

import * as mockUserService from './mockUserService';
import * as apiUserService from './apiUserService';

const USE_API = false;

const userService = USE_API ? apiUserService : mockUserService;

export const { getCurrentUser } = userService;