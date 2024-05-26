import React from 'react';
import { Loader, LucideLanguages } from 'lucide-react';
import {
  ClerkLoaded,
  ClerkLoading,
  SignIn,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

type Props = {};

export const Header = ({}: Props) => {
  return (
    <header className="h-20 w-full border-b-2 border-slate-700 px-4">
      <div className="lg;max-w-screen-lg mx-auto flex items-center justify-between h-full ">
        <Link href="/">
          <div className="pt-8 pl-4 pb-7 flex items-center gap-x-3">
            <div className="bg-green-500 text-slate-900 h-full p-4">
              <LucideLanguages size={32} />
            </div>

            <h2 className="text-green-500 text-3xl tracking-widest font-bold">
              Lingo
            </h2>
          </div>
        </Link>
        <ClerkLoading>
          <Loader className="w-5 h-5 text-muted-foreground animate-spin" />
        </ClerkLoading>
        <ClerkLoaded>
          <SignedIn>
            <UserButton afterSignOutUrl="/learn" />
          </SignedIn>
        </ClerkLoaded>
        <SignedOut>
          <SignInButton mode="modal" forceRedirectUrl="/learn">
            <Button size="lg" variant="ghost">
              Login
            </Button>
          </SignInButton>
        </SignedOut>
      </div>
    </header>
  );
};
