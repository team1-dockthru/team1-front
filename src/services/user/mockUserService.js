import { currentUserMock } from '@/mocks/currentUser';

export async function getCurrentUser() {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return currentUserMock;
}