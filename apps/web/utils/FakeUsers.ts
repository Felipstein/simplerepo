import { Pos } from '../@types/Pos';
import { UserConnected } from '../@types/UserConnected';

export function generateRandomPos(maxWidth: number, maxHeight: number): Pos {
  const x = Math.floor(Math.random() * maxWidth);
  const y = Math.floor(Math.random() * maxHeight);

  return { x, y };
}

export const createFakeUsers = (): UserConnected[] => [
  {
    user: { username: 'Felipe', color: '#fafafa' },
    pos: generateRandomPos(window.innerWidth, window.innerHeight),
  },
  {
    user: { username: 'Antonio', color: '#78eefe' },
    pos: generateRandomPos(window.innerWidth, window.innerHeight),
  },
  {
    user: { username: 'Carlos', color: '#e9f673' },
    pos: generateRandomPos(window.innerWidth, window.innerHeight),
  },
  {
    user: { username: 'João', color: '#efaede' },
    pos: generateRandomPos(window.innerWidth, window.innerHeight),
  },
  {
    user: { username: 'Maria', color: '#44e467' },
    pos: generateRandomPos(window.innerWidth, window.innerHeight),
  },
];
