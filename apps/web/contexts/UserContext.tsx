/* eslint-disable no-unused-vars */

'use client';

import { ReactNode, createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import { User } from '../@types/User';
import { USER_STORAGE_KEY } from '../utils/Constants';

type UserContextAuthenticated =
  | {
      isAuth: false;
      user: null;
    }
  | {
      isAuth: true;
      user: User;
    };

export type UserContextProps = UserContextAuthenticated & {
  saveUser(user: User): void;
  removeUser(): void;
};

export const UserContext = createContext({} as UserContextProps);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const userCookie = document.cookie.split('; ').find((cookie) => cookie.startsWith(`${USER_STORAGE_KEY}=`));

    if (userCookie) {
      try {
        const user = JSON.parse(userCookie.split('=')[1]);

        setUser(user);
      } catch {}
    }
  }, []);

  const saveUser = useCallback<UserContextProps['saveUser']>((user) => {
    setUser(user);
    document.cookie = `${USER_STORAGE_KEY}=${JSON.stringify(user)}`;
  }, []);

  const removeUser = useCallback<UserContextProps['removeUser']>(() => {
    setUser(null);
    document.cookie = `${USER_STORAGE_KEY}=`;
  }, []);

  const context = useMemo(() => ({ user, isAuth: !!user, saveUser, removeUser }), [user, saveUser, removeUser]);

  // @ts-expect-error isAuth is a boolean
  return <UserContext.Provider value={context}>{children}</UserContext.Provider>;
}

export const useUser = () => useContext(UserContext);
