import { cookies } from 'next/headers';

import { User } from '../@types/User';

import { USER_STORAGE_KEY } from './Constants';

export function getUser() {
  const cookiesStore = cookies();

  const userCookie = cookiesStore.get(USER_STORAGE_KEY);

  if (!userCookie) {
    return null;
  }

  try {
    const user = JSON.parse(userCookie.value) as User;

    if (!user) {
      return null;
    }

    return user;
  } catch {
    return null;
  }
}
