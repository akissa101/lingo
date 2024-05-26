import React from 'react';
import { MobileSidebar } from './mobile-sidebar';

type MobileHeaderProps = {};

export const MobileHeader = ({}: MobileHeaderProps) => {
  return (
    <nav className="flex items-center border-b bg-green-800 border-slate-700 fixed top-0 w-full z-50 px-4 h-[50px] lg:hidden">
      <MobileSidebar />
    </nav>
  );
};
