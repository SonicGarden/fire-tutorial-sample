import '@/styles/globals.css';
import '@/utils/firebase/app';
import { ColorSchemeScript } from '@mantine/core';
import { MantineProvider } from '@/utils/mantine/provider';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Firebaseチュートリアル',
  viewport: 'minimum-scale=1, initial-scale=1, width=device-width, maximum-scale=1',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ja'>
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider>{children}</MantineProvider>
      </body>
    </html>
  );
}
