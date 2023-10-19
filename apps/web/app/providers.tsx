import { ReactNode } from 'react';

import { SocketProvider } from '../contexts/SocketContext';
import { UserProvider } from '../contexts/UserContext';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <SocketProvider>
      <UserProvider>{children}</UserProvider>
    </SocketProvider>
  );
}
