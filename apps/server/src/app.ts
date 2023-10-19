import { createServer } from 'node:http';

import chalk from 'chalk';
import cors from 'cors';
import express from 'express';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
import { Server as SocketServer } from 'socket.io';

import { getUsersConnected, setupCursorsManager } from './CursorsManager';

const app = express();

const origin = process.env.ORIGIN;

if (origin) {
  app.use(cors({ origin }));
} else {
  console.warn(chalk.yellow('No origin provided for CORS.'));
}

app.use(
  rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 100,
  }),
);

app.use(morgan(process.env.NODE_ENV === 'development' ? 'dev' : 'combined'));

app.get('/', (req, res) => {
  res.sendStatus(200);
});

app.get('/users_connected', (req, res) => {
  console.info('Request for user information received, sending...');

  const usersConnectedParsed = getUsersConnected().map((user) => user.toPlainObject());

  res.json({ usersConnected: usersConnectedParsed });
});

const rawServer = createServer(app);

const io = new SocketServer(rawServer, { cors: { origin: origin ?? undefined } });

setupCursorsManager();

export { app, io, rawServer as server };
