import { Button } from '@/components/ui/button';
import { time } from 'console';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

type HeaderProps = {
  title: string;
};

export const Header = ({ title }: HeaderProps) => {
  return (
    <div className="sticky top-0 w-full bg-slate-900 pb-3 px-4 lg:pt-[28px] lg:mt-[-27px] flex items-center justify-between border-b-2 border-slate-700 mb-5 text-slate-300  lg:z-50">
      <Link href="/courses">
        <Button
          variant="ghost"
          size="sm"
          className="border-slate-700 hover:bg-slate-700"
        >
          <ArrowLeft className="h-5 w-5 stroke-2 text-slate-300" />
        </Button>
      </Link>
      <h1 className="text-lg font-bold"> {title}</h1>
      <div />
    </div>
  );
};
