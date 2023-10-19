/* eslint-disable no-unused-vars */
import { EventPayload, EventType } from './EventTypes';

import type { Socket } from 'socket.io';
// eslint-disable-next-line import/order
import type { Position } from '../../types';

export class ClientSocket {
  constructor(private readonly userSocket: Socket) {
    if (!userSocket) {
      throw new Error('User socket is not set');
    }
  }

  emit<TEventType extends EventType>(event: TEventType, data: EventPayload<TEventType>) {
    this.userSocket.emit(event, data);
  }

  on<TEventType extends EventType>(event: TEventType, listener: (data: EventPayload<TEventType>) => void) {
    // @ts-expect-error
    this.userSocket.on(event, listener);
  }

  off<TEventType extends EventType>(event: TEventType, listener: (data: EventPayload<TEventType>) => void) {
    this.userSocket.off(event, listener);
  }

  updateUserPosition(pos: Position | null) {
    this.emit('update-user-position', { pos });
  }

  onUpdateUsers(listener: (data: EventPayload<'update-users'>) => void) {
    this.on('update-users', listener);
  }
}
