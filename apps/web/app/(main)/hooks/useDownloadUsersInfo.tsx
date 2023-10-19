'use client';

import { useEffect, useMemo, useState } from 'react';

import { UserConnected } from '../../../@types/UserConnected';
import { ToastAction } from '../../../components/ui/toast';
import { useToast } from '../../../components/ui/use-toast';
import { getServerURL } from '../../../utils/Server';

export function useDownloadUsersInfo() {
  const [usersConnected, setUsersConnected] = useState<UserConnected[]>([]);
  const [isDownloading, setIsDownloading] = useState(false);

  const { toast } = useToast();

  useEffect(() => {
    // eslint-disable-next-line next-recommended/async-component-no-hooks
    async function downloadUsersInfo() {
      setIsDownloading(true);

      try {
        const response = await fetch(`${getServerURL()}/users_connected`, { method: 'GET' });

        if (!response.ok) {
          throw new Error('unknown');
        }

        const { usersConnected } = await response.json();

        setUsersConnected(usersConnected);
      } catch (err: unknown) {
        let message: string;

        if (err instanceof Error) {
          message = err.message;
        } else if (typeof err === 'string' && err !== 'unknown') {
          message = err;
        } else {
          message =
            'An error occurred without any information while downloading data from the server. Please contact me in the About section.';
        }

        toast({
          title: 'Failed to download users info',
          description: message,
          variant: 'destructive',
          action: (
            <ToastAction altText="Try again" onClick={() => downloadUsersInfo()}>
              Try again
            </ToastAction>
          ),
        });
      } finally {
        setIsDownloading(false);
      }
    }

    downloadUsersInfo();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const context = useMemo(() => ({ usersConnected, isDownloading }), [usersConnected, isDownloading]);

  return context;
}
