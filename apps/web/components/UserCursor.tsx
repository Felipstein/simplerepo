import { MousePointer2 } from 'lucide-react';

import { Pos } from '../@types/Pos';
import { User } from '../@types/User';

import { Label } from './ui/label';

export interface UserCursorElementProps {
  user: User;
}

export function UserCursorElement({ user }: UserCursorElementProps) {
  return (
    <div
      className="relative flex max-w-[100px] flex-col items-center justify-center truncate"
      style={{ color: user.color }}
    >
      <Label className="w-full truncate text-xs font-extralight opacity-90">{user.username}</Label>

      <MousePointer2 className="h-6 w-6" />
    </div>
  );
}

export interface UserCursorProps {
  user: User;
  pos: Pos;
}

export function UserCursor({ user, pos }: UserCursorProps) {
  return (
    <div className="absolute" style={{ top: pos.y, left: pos.x }}>
      <UserCursorElement user={user} />
    </div>
  );
}
