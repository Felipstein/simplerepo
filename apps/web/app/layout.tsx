import './globals.css';

import { Inter } from 'next/font/google';
import { ReactNode } from 'react';

import { LogoutButton } from '../components/LogoutButton';
import { NavigateButton } from '../components/NavigateButton';
import { ShowMoreInfoToggler } from '../components/ShowMoreInfoToggler';
import { SocketIndicator } from '../components/SocketIndicator';
import { Toaster } from '../components/ui/toaster';

import { Providers } from './providers';

import type { Metadata } from 'next';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Simple Repo',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} overflow-hidden`}>
        <Providers>
          <div className="fixed right-6 top-4 flex items-center gap-12">
            {/* {process.env.NODE_ENV === 'development' && ( */}
            <ShowMoreInfoToggler />
            {/* )} */}

            <div className="flex items-center gap-1.5">
              <NavigateButton />

              <LogoutButton />
            </div>
          </div>

          {children}

          {/* {process.env.NODE_ENV === 'development' && ( */}
          <div className="fixed left-4 top-4">
            <SocketIndicator />
          </div>
          {/* )} */}

          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
