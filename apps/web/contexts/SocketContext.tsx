/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */

'use client';

import { ReactNode, createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { io as socketIOClient } from 'socket.io-client';

import { User } from '../@types/User';
import { getServerURL } from '../utils/Server';

import type { Socket } from 'socket.io-client';

export interface SocketContextProps {
  socket: Socket | null;
  isConnected: boolean;
  isIdle: boolean;
  connect(user: User): void;
  disconnect(): void;
}

export const SocketContext = createContext({} as SocketContextProps);

export function SocketProvider({ children }: { children: ReactNode }) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isIdle, setIsIdle] = useState(true);

  const connect = useCallback<SocketContextProps['connect']>(
    (user) => {
      if (socket) {
        return;
      }

      setIsIdle(false);

      const socketInstance = socketIOClient(getServerURL(), { query: { user: JSON.stringify(user) } });

      socketInstance.on('connect', () => {
        console.info('You are connected.');

        setSocket(socketInstance);
      });

      socketInstance.on('disconnect', () => {
        console.info('You are disconnected.');

        setSocket(null);
      });
    },
    [socket],
  );

  const disconnect = useCallback<SocketContextProps['disconnect']>(() => {
    setIsIdle(true);

    socket?.disconnect();
  }, [socket]);

  useEffect(
    () => () => {
      if (socket) {
        socket.disconnect();
      }
    },
    [socket],
  );

  const context = useMemo(
    () => ({ socket, isConnected: !!socket, isIdle, connect, disconnect }),
    [socket, isIdle, connect, disconnect],
  );

  return <SocketContext.Provider value={context}>{children}</SocketContext.Provider>;
}

export const useSocket = () => useContext(SocketContext);
