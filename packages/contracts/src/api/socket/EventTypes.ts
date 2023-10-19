import type { Position, User } from '../../types';

export interface Event {
  'update-users': { usersConnected: User[] };
  'update-user-position': { pos: Position | null };
}

export type EventType = keyof Event;

export type EventPayload<TEventType extends EventType> = Event[TEventType];
