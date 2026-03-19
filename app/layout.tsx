import '../src/index.css';
import './fonts.css';

import type { ReactNode } from 'react';
import { Lora } from 'next/font/google';
import Providers from '../src/App';
import { Layout } from '../src/components/Layout';

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-lora',
  weight: ['400', '500', '600', '700'],
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={lora.variable}>
        <Providers>
          <Layout>{children}</Layout>
        </Providers>
      </body>
    </html>
  );
}

