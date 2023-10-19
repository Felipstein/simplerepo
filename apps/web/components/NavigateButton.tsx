'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Button } from './ui/button';

export function NavigateButton() {
  const pathname = usePathname();

  const showAboutButton = pathname !== '/about';

  return (
    <Button variant="ghost" asChild>
      <Link href={showAboutButton ? '/about' : '/'}>{showAboutButton ? 'About' : 'Home'}</Link>
    </Button>
  );
}
