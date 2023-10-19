import chalk from 'chalk';
import { Socket } from 'socket.io';
import { z } from 'zod';

import { Pos } from './@types/Pos';
import { User } from './@types/User';
import { io } from './app';
import { UserCursorEntity } from './entities/UserCursorEntity';

const CHECK_USERS_CONNECTION_INTERVAL = 60 * 1000; // 1 minute

const userPayloadSchema = z.object({
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters')
    .max(16, 'Username must be at most 16 characters'),
  color: z
    .string()
    .refine((color) => /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(color), { message: 'Invalid color code' }),
});

let usersConnected: UserCursorEntity[] = [];

export function getUsersConnected() {
  return usersConnected;
}

type RefuseConnectionInfo =
  | {
      reason: 'no-user-payload';
    }
  | {
      reason: 'invalid-user-payload';
      invalidPayload: unknown;
    };

export function setupCursorsManager() {
  function refuseConnection(socket: Socket, info: RefuseConnectionInfo) {
    const messages: Record<RefuseConnectionInfo['reason'], string> = {
      'no-user-payload': 'A socket connected without user info.',
      'invalid-user-payload': 'A socket connected with invalid user info.',
    };

    console.warn('\n', chalk.yellow(`${messages[info.reason]} (socket-id: ${socket.id})`));

    if (info.reason === 'invalid-user-payload') {
      console.warn(chalk.yellow('User data received:'), chalk.white(info.invalidPayload));
    }

    console.warn(chalk.yellow('Refusing connection.\n'));

    socket.disconnect();
  }

  function updateUsers(socket: Socket | typeof io = io) {
    const usersConnectedParsed = usersConnected.map((user) => user.toPlainObject());

    socket.emit('update-users', { usersConnected: JSON.stringify(usersConnectedParsed) });
  }

  function checkAndCleanDisconnectedUsers() {
    console.info(chalk.gray('\nChecking users connection...'));

    if (usersConnected.length > 0) {
      console.info(`Users connected: ${usersConnected.length}`);

      const disconnectedUsers = usersConnected.filter((user) => !user.isConnected());

      if (disconnectedUsers.length > 0) {
        console.info(chalk.red(`\nFound ${disconnectedUsers.length} users disconnected, cleaning users list...`));

        usersConnected = usersConnected.filter((user) => user.isConnected());
      } else {
        console.info(chalk.gray('\nNo users disconnected, fine.'));
      }

      updateUsers();
    } else {
      console.info('No users connected.');
    }

    const nextVerificationMS = Date.now() + CHECK_USERS_CONNECTION_INTERVAL;
    const nextVerification = new Date(nextVerificationMS);

    const nextVerificationString = `${nextVerification.getHours()}:${nextVerification.getMinutes()}:${nextVerification.getSeconds()}`;

    console.info(chalk.gray(`Next verification: ${nextVerificationString}\n`));
  }

  io.on('connect', (data) => {
    const socketId = data.id;

    const userPayloadJSON = data.handshake.query.user as string;

    if (!userPayloadJSON) {
      refuseConnection(data, { reason: 'no-user-payload' });

      return;
    }

    let userPayload: User;

    try {
      userPayload = JSON.parse(userPayloadJSON);

      userPayload = userPayloadSchema.parse(userPayload);
    } catch {
      refuseConnection(data, { reason: 'invalid-user-payload', invalidPayload: userPayloadJSON });

      return;
    }

    console.info(
      chalk.green('User'),
      chalk.white(userPayload.username),
      chalk.green('connected with socket-id'),
      chalk.yellow(socketId),
    );

    const user = new UserCursorEntity(data, userPayload);

    usersConnected.push(user);

    updateUsers();

    data.on('disconnect', () => {
      console.info(
        chalk.gray('User'),
        chalk.white(userPayload.username),
        chalk.gray('disconnected. socket-id:'),
        chalk.yellow(socketId),
      );

      usersConnected = usersConnected.filter(({ socket }) => socket.id !== socketId);

      updateUsers();
    });

    data.on('update-user-position', ({ pos }: { pos: Pos | null }) => {
      usersConnected = usersConnected.map((userCursor) => {
        if (userCursor.socket.id === socketId) {
          userCursor.updatePosition(pos);
        }

        return userCursor;
      });

      const userMap = new Map<string, UserCursorEntity>();

      usersConnected.forEach((userEntity, index) => {
        const username = userEntity.getUsername();

        if (userEntity.isConnected() && userMap.has(username) && !userMap.get(username)!.isConnected()) {
          const previousIndex = usersConnected.findIndex((u) => u.getUsername() === username && !u.isConnected());

          if (previousIndex !== -1) {
            usersConnected.splice(previousIndex, 1);
          }
        } else if (!userEntity.isConnected() && userMap.has(username) && userMap.get(username)!.isConnected()) {
          usersConnected.splice(index, 1);
        }

        userMap.set(username, userEntity);
      });

      updateUsers();
    });
  });

  setInterval(checkAndCleanDisconnectedUsers, CHECK_USERS_CONNECTION_INTERVAL);
}
