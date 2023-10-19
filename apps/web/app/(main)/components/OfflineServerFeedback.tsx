import { CloudOff } from 'lucide-react';

import { AboutLink } from '../../../components/AboutLink';

export function OfflineServerFeedback() {
  return (
    <div className="flex h-full items-center justify-center">
      <main className="flex flex-col items-center gap-8">
        <header className="flex flex-col items-center gap-2 text-foreground">
          <CloudOff className="h-7 w-7" />

          <h3 className="text-lg font-medium">Server offline at the moment, sorry.</h3>
        </header>

        <p className="text-sm text-muted-foreground">
          Try again later, or chat with me on <AboutLink />.
        </p>
      </main>
    </div>
  );
}
