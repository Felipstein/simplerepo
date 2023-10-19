'use client';

import { UserConnected } from '../../../../@types/UserConnected';
import { useUser } from '../../../../contexts/UserContext';
import { useDebugModeStore } from '../../../../stores/DebugModeStore';

export interface UserInfoProps {
  user: UserConnected;
}

export function UserInfo({ user: { user, pos } }: UserInfoProps) {
  const { user: userAuthenticated } = useUser();

  const debugMode = useDebugModeStore((s) => s.enabled);

  return (
    <div className="flex items-center gap-1" style={{ color: user.color }}>
      <div className="flex items-end gap-2">
        <p>{user.username}</p>

        {debugMode && (
          <span className="font-mono text-xs opacity-80">{pos ? JSON.stringify(pos) : 'No positioned'}</span>
        )}
      </div>

      {userAuthenticated?.username === user.username && (
        <small className="text-[10px] uppercase italic text-muted-foreground">You</small>
      )}
    </div>
  );
}
