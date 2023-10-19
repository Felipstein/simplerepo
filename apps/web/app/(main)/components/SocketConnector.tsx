'use client';

import { useEffect, useState } from 'react';

import { useSocket } from '../../../contexts/SocketContext';
import { useUser } from '../../../contexts/UserContext';
import { useDownloadUsersInfo } from '../hooks/useDownloadUsersInfo';

import { CursorsArea } from './CursorsArea';

export function SocketConnector() {
  const { user } = useUser();

  const { isConnected, socket, connect, disconnect } = useSocket();
  const { usersConnected, isDownloading } = useDownloadUsersInfo();

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (user) {
      connect(user);
    }
  }, [connect, user]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => () => disconnect(), []);

  if (!isConnected || !socket) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-sm font-medium text-foreground">Connecting...</p>
      </div>
    );
  }

  if (isDownloading) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-sm font-medium text-foreground">Downloading server info...</p>
      </div>
    );
  }

  return isMounted ? <CursorsArea socket={socket} initialUserPositions={usersConnected} addUserIfMissing /> : null;
}
