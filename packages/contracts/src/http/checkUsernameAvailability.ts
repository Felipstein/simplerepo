import { z } from 'zod';

export const checkUsernameAvailabilityParamsRequest = z.object({
  username: z.string(),
});

export type CheckUsernameAvailabilityParamsRequest = z.infer<typeof checkUsernameAvailabilityParamsRequest>;

export type CheckUsernameAvailabilityResponse = {
  available: boolean;
};
