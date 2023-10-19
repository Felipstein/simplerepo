import { Position } from './Position';
import { Profile } from './Profile';

export interface User {
  socketId: string;
  profile: Profile;
  pos: Position;
}
