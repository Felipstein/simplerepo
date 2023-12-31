/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-empty-interface */

import 'dotenv/config';

import chalk from 'chalk';
import { ZodError, z } from 'zod';

const envVariablesSchema = z.object({
  NODE_ENV: z.enum(['development', 'production']),
  PORT: z.coerce.number().default(3333),
  ORIGIN: z.string().optional(),
});

try {
  const parsed = envVariablesSchema.parse(process.env);

  // @ts-expect-error
  process.env = { ...process.env, ...parsed };

  console.info(chalk.gray('Environment variables loaded.'));
} catch (err: Error | unknown) {
  if (err instanceof ZodError) {
    const variables: { env: string; message: string }[] = err.issues.map((issue) => ({
      env: issue.path.join('.'),
      message: issue.message,
    }));

    console.error(chalk.red.bold('\nWrong environment variables:'));

    variables.forEach((variable) => {
      console.error(chalk.gray('-'), chalk.white(`${variable.env}:`), variable.message);
    });

    process.exit(1);
  }

  throw err;
}

declare global {
  namespace NodeJS {
    // @ts-ignore
    interface ProcessEnv extends z.infer<typeof envVariablesSchema> {}
  }
}
