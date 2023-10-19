import axios from 'axios';

import { getHTTPBaseURL } from './core/builder';

import type { CheckUsernameAvailabilityResponse } from '../../http/checkUsernameAvailability';

export async function checkUsernameAvailability(username: string, baseURL = getHTTPBaseURL()) {
  const url = `${baseURL}/username/${username}/available`;

  const response = await axios.get<CheckUsernameAvailabilityResponse>(url);

  return response.data.available;
}
