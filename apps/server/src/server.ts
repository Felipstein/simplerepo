import './env';

import chalk from 'chalk';

import { server } from './app';

const port = process.env.PORT;

server.listen(port, () => {
  console.info(chalk.cyan(`\nServer started at port ${port}.`));

  if (process.env.NODE_ENV === 'development') {
    console.info(chalk.gray('[DEVELOPMENT MODE]'));
  }

  console.info('\n\n');
});
