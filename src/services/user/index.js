// Mock/API 전환 스위치

import * as mockUserService from './mockUserService';
import * as apiUserService from './apiUserService';

const USE_API = true;

const userService = USE_API ? apiUserService : mockUserService;

export const { getCurrentUser, signup, login, googleLogin, logout } = userService;
