import '../src/index.css';
import './fonts.css';

import type { ReactNode } from 'react';
import { Lora } from 'next/font/google';
import localFont from 'next/font/local';
import Providers from '../src/App';
import { Layout } from '../src/components/Layout';

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-lora',
  weight: ['400', '500', '600', '700'],
});

const hedvigLettersSerif = localFont({
  src: './fonts/HedvigLettersSerif-Regular.woff2',
  display: 'swap',
  variable: '--font-hedvig-serif',
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${lora.variable} ${hedvigLettersSerif.variable}`}>
        <Providers>
          <Layout>{children}</Layout>
        </Providers>
      </body>
    </html>
  );
}

