import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { ClerkLoading, ClerkLoaded, UserButton } from '@clerk/nextjs';

import { SidebarItem } from './sidebar-item';
import { cn } from '@/lib/utils';
import { Loader } from 'lucide-react';

type SidebarProps = {
  className?: string;
};

export const Sidebar = ({ className }: SidebarProps) => {
  return (
    <div
      className={cn(
        'lg:fixed left-0 top-0 bg-slate-800 px-4 border-r-2 border-slate-700 flex flex-col h-full lg:w-64 ',
        className
      )}
    >
      <Link href="/learn">
        <div className="pt-8 pl-4 pb-7 flex items-center gap-x-3">
          <div className="bg-green-500 text-slate-900 h-full p-4">
            <Image src="/images/logo.svg" alt="Logo" width={28} height={28} />
          </div>

          <h2 className="text-green-500 text-3xl tracking-widest font-bold">
            Lingo
          </h2>
        </div>
      </Link>
      <div className="flex flex-col gap-y-2 flex-grow h-96">
        <SidebarItem label="Learn" href="/learn" iconPath="/images/learn.svg" />
        <SidebarItem
          label="Leaderboar"
          href="/leaderboard"
          iconPath="/images/leaderboard.svg"
        />
        <SidebarItem
          label="Quest"
          href="/quests"
          iconPath="/images/quest.svg"
        />{' '}
        <SidebarItem label="Shop" href="/shop" iconPath="/images/shop.svg" />
      </div>
      <div className="p-4 ">
        <ClerkLoading>
          <Loader className="text-muted-foreground w-12 h-12 animate-spin" />
        </ClerkLoading>
        <ClerkLoaded>
          <UserButton afterSignOutUrl="/" />
        </ClerkLoaded>
      </div>
    </div>
  );
};
