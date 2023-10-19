import axios from 'axios';

import { getHTTPBaseURL } from './core/builder';

export async function checkServerHealth(baseURL = getHTTPBaseURL()) {
  const url = `${baseURL}/`;

  try {
    const response = await axios.get(url);

    if (response.status > 399) {
      return false;
    }

    return true;
  } catch {
    return false;
  }
}
