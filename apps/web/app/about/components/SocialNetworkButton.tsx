import Link from 'next/link';
import { ComponentType } from 'react';

import { Button } from '../../../components/ui/button';

export interface SocialNetworkButtonProps {
  href: string;
  icon: ComponentType;
}

export function SocialNetworkButton({ href, icon: Icon }: SocialNetworkButtonProps) {
  return (
    <Button variant="ghost" size="sm" asChild>
      <Link href={href}>
        <Icon />
      </Link>
    </Button>
  );
}
