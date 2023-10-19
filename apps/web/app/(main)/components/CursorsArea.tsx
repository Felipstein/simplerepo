'use client';

import { MouseEvent, useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';

import { UserConnected } from '../../../@types/UserConnected';
import { UserCursor } from '../../../components/UserCursor';
import { useUser } from '../../../contexts/UserContext';

import { UsersInfoList } from './usersInfoList/UsersInfoList';

export interface CursorsAreaProps {
  socket: Socket;
  initialUserPositions?: UserConnected[];
  addUserIfMissing?: boolean;
}

export function CursorsArea({ socket, initialUserPositions = [], addUserIfMissing = false }: CursorsAreaProps) {
  const { user: userAuthenticated } = useUser();

  const [users, setUsers] = useState<UserConnected[]>(() => {
    if (!addUserIfMissing) {
      return initialUserPositions;
    }

    if (initialUserPositions.length === 0) {
      return [];
    }

    const userPositions = [...initialUserPositions];

    userPositions.push({
      user: userAuthenticated!,
      pos: null,
    });

    return userPositions;
  });

  useEffect(() => {
    socket.on('update-users', (data) => {
      const usersConnectedJSON = data.usersConnected as string;

      const usersConnected = JSON.parse(usersConnectedJSON) as UserConnected[];

      setUsers(usersConnected);
    });
  }, [socket]);

  function updatePosition(event: MouseEvent) {
    const pos = { x: event.clientX, y: event.clientY };

    socket.emit('update-user-position', { pos });
  }

  function removePosition() {
    socket.emit('update-user-position', { pos: null });
  }

  return (
    <div className="h-full overflow-hidden" onMouseMove={updatePosition} onMouseLeave={removePosition}>
      <UsersInfoList users={users} />

      {users
        .filter(({ pos }) => !!pos)
        .filter(({ user }) => user.username !== userAuthenticated?.username)
        .map(({ user, pos }) => (
          <UserCursor key={user.username} user={user} pos={pos!} />
        ))}
    </div>
  );
}
