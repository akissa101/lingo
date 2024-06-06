import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import { cn } from '@/lib/utils';
import { ClerkProvider } from '@clerk/nextjs';
import './globals.css';
import { Toaster } from '@/components/ui/sonner';
import { ExitModal } from '@/components/modals/exit-modal';
import { HeartsModal } from '@/components/modals/hearts-modal';
import { PracticeModal } from '@/components/modals/practice-modal';

const font = Nunito({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={cn('bg-slate-900 text-slate-50', font.className)}>
          <Toaster position="top-center" richColors />
          <PracticeModal />
          <HeartsModal />
          <ExitModal />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
