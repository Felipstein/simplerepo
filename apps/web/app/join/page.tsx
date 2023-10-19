import { redirect } from 'next/navigation';

import { getUser } from '../../utils/GetUser';

import { JoinForm } from './components/JoinForm';

export default function JoinPage() {
  const user = getUser();

  if (user) {
    return redirect('/');
  }

  return (
    <div className="flex h-full items-center justify-center">
      <main className="space-y-6">
        <header className="flex select-none items-end">
          <h1 className="text-3xl font-semibold">SIMPLE</h1>
          <h3 className="text-xl opacity-80">REPO</h3>
        </header>

        <p className="text-sm text-muted-foreground">Put your name and select a color to join</p>

        <JoinForm />
      </main>
    </div>
  );
}
