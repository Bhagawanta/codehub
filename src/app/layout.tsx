import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import AuthProvider from '@/context/AuthProvider';
import Prism from 'prismjs';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CodeHub',
  description: 'CodeHub Management'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        </head>
        <body className={inter.className}>
          <AuthProvider>
            {children}
            <Toaster />
          </AuthProvider>
        </body>
    </html>
  );
}