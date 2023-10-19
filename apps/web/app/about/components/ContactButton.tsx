'use client';

import { ReactNode } from 'react';

import { Button } from '../../../components/ui/button';
import { useToast } from '../../../components/ui/use-toast';

export interface ContactButtonProps {
  text: string;
  children: ReactNode;
}

export function ContactButton({ text, children }: ContactButtonProps) {
  const { toast } = useToast();

  function copyToClipboard() {
    navigator.clipboard.writeText(text);

    toast({
      description: (
        <span className="text-muted-foreground">
          Copied <span className="text-foreground">{text}</span> to clipboard
        </span>
      ),
    });
  }

  return (
    <Button title={`Click to copy ${text}`} variant="ghost" size="sm" onClick={copyToClipboard}>
      {children}
    </Button>
  );
}
