'use client';

import { AlertCircle, Ban, CheckCircle2 } from 'lucide-react';
import { ComponentProps, ComponentType } from 'react';

import { useSocket } from '../contexts/SocketContext';
import { cn } from '../lib/utils';

import { Badge } from './ui/badge';

type IconProps<TComponent extends ComponentType> = {
  src: TComponent;
} & ComponentProps<TComponent>;

// @ts-ignore
function Icon<TComponent extends ComponentType>({ src: IconComponent, className, ...props }: IconProps<TComponent>) {
  // @ts-ignore
  return <IconComponent {...props} className={cn('mr-1.5 h-4 w-4', className)} />;
}

export function SocketIndicator() {
  const { isConnected, isIdle } = useSocket();

  if (isIdle) {
    return (
      <Badge variant="secondary" className="pointer-events-none">
        <Icon src={Ban} className="text-red-500" />
        <span>Disconnected</span>
      </Badge>
    );
  }

  if (isConnected) {
    return (
      <Badge variant="secondary" className="pointer-events-none bg-emerald-600">
        <Icon src={CheckCircle2} />
        <span>Connected</span>
      </Badge>
    );
  }

  return (
    <Badge variant="secondary" className="pointer-events-none">
      <Icon src={AlertCircle} className="text-amber-400" />
      <span>Trying to connect...</span>
    </Badge>
  );
}
