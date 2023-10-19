export function getServerURL() {
  const serverURL = process.env.NEXT_PUBLIC_SERVER_URL;

  if (!serverURL) {
    throw new Error('NEXT_PUBLIC_SERVER_URL is not defined');
  }

  return serverURL;
}

export async function checkServerHealth(serverURL = getServerURL()) {
  try {
    console.info(`Checking server health at ${serverURL}...`);

    await fetch(serverURL);

    console.info('Server is healthy.');

    return true;
  } catch (err: unknown) {
    console.error('Failed to connect to server', err);

    return false;
  }
}
