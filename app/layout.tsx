import '../src/index.css';

import type { ReactNode } from 'react';
import Providers from '../src/App';
import { Layout } from '../src/components/Layout';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Layout>{children}</Layout>
        </Providers>
      </body>
    </html>
  );
}

