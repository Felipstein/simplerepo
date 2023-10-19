let httpBaseURL: string | null;

export function getHTTPBaseURL() {
  if (!httpBaseURL) {
    throw new Error('HTTP base URL is not set');
  }

  return httpBaseURL;
}

export function setHTTPBaseURL(newHttpBaseURL: string) {
  httpBaseURL = newHttpBaseURL;
}
