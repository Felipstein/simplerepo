import { UserConnected } from '../../../../@types/UserConnected';

import { UserInfo } from './UserInfo';

export interface UsersInfoListProps {
  users: UserConnected[];
}

export function UsersInfoList({ users }: UsersInfoListProps) {
  return (
    <div className="absolute left-4 top-16">
      <p className="mb-2 text-xs text-muted-foreground">
        {users.length > 0 ? `Users connected (${users.length})` : 'No users connected'}
      </p>

      <ul>
        {users.map((user) => (
          <li key={user.user.username}>
            <UserInfo user={user} />
          </li>
        ))}
      </ul>
    </div>
  );
}
