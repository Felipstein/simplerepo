/* eslint-disable no-unused-vars */
import { User } from '../../types';

import type { Server } from 'socket.io';
// eslint-disable-next-line import/order
import type { EventPayload, EventType } from './EventTypes';

export class ServerSocket {
  constructor(private readonly io: Server) {
    if (!io) {
      throw new Error('Server is not set');
    }
  }

  emit<TEventType extends EventType>(event: TEventType, data: EventPayload<TEventType>) {
    this.io.emit(event, data);
  }

  on<TEventType extends EventType>(event: TEventType, listener: (data: EventPayload<TEventType>) => void) {
    // @ts-expect-error
    this.io.on(event, listener);
  }

  off<TEventType extends EventType>(event: TEventType, listener: (data: EventPayload<TEventType>) => void) {
    this.io.off(event, listener);
  }

  updateUsers(usersConnected: User[]) {
    this.emit('update-users', { usersConnected });
  }

  onUpdateUserPosition(listener: (data: EventPayload<'update-user-position'>) => void) {
    this.on('update-user-position', listener);
  }
}
