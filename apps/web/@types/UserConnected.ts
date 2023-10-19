import { Pos } from './Pos';
import { User } from './User';

export interface UserConnected {
  user: User;
  pos: Pos | null;
}
