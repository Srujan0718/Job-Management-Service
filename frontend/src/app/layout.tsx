import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/notifications/styles.css';

import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { Inter } from 'next/font/google';
import { JobsProvider } from './JobsContextProvider';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
});

export const metadata = {
  title: 'Job Management Admin',
  description: 'Admin interface for managing job postings',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ColorSchemeScript />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <JobsProvider>
          <MantineProvider>
            <Notifications />
            {children}
          </MantineProvider>
        </JobsProvider>
      </body>
    </html>
  );
}