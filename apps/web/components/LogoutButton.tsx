'use client';

import { useRouter } from 'next/navigation';

import { useSocket } from '../contexts/SocketContext';
import { useUser } from '../contexts/UserContext';

import { Button } from './ui/button';

export function LogoutButton() {
  const { push } = useRouter();
  const { disconnect } = useSocket();
  const { isAuth, removeUser } = useUser();

  if (!isAuth) {
    return null;
  }

  function logOut() {
    removeUser();
    push('/join');
    disconnect();
  }

  return (
    <Button variant="ghost" onClick={() => logOut()}>
      Logout
    </Button>
  );
}
