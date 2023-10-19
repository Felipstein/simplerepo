'use client';

import { usePathname } from 'next/navigation';

import { useDebugModeStore } from '../stores/DebugModeStore';

import { Label } from './ui/label';
import { Switch } from './ui/switch';

export function ShowMoreInfoToggler() {
  const pathname = usePathname();

  const { enabled, toggleDebugMode } = useDebugModeStore();

  if (pathname !== '/') {
    return null;
  }

  return (
    <div className="flex items-center space-x-2">
      <Switch id="debug-mode" checked={enabled} onCheckedChange={() => toggleDebugMode()} />
      <Label htmlFor="debug-mode" className="cursor-pointer">
        Debug
      </Label>
    </div>
  );
}
