import { redirect } from 'next/navigation';

import { getUser } from '../../utils/GetUser';
import { checkServerHealth } from '../../utils/Server';

import { OfflineServerFeedback } from './components/OfflineServerFeedback';
import { SocketConnector } from './components/SocketConnector';

export default async function HomePage() {
  const serverIsAlive = await checkServerHealth();

  if (!serverIsAlive) {
    return <OfflineServerFeedback />;
  }

  const user = getUser();

  if (!user) {
    return redirect('/join');
  }

  return <SocketConnector />;
}
