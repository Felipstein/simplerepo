/* eslint-disable no-unused-vars */

import { Socket } from 'socket.io';

import { Pos } from '../@types/Pos';
import { User } from '../@types/User';

export class UserCursorEntity {
  constructor(
    public readonly socket: Socket,
    private readonly user: User,
    private pos: Pos | null = null,
  ) {}

  isConnected() {
    return this.socket.connected;
  }

  getUsername() {
    return this.user.username;
  }

  isPositioned() {
    return !!this.pos;
  }

  getPosition() {
    return this.pos;
  }

  updatePosition(pos: Pos | null) {
    this.pos = pos;
  }

  toPlainObject() {
    return {
      user: this.user,
      pos: this.pos,
    };
  }
}
