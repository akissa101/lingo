import { cn } from '@/lib/utils';
import { boolean } from 'drizzle-orm/mysql-core';
import { CheckIcon } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

type CardProps = {
  id: number;
  title: string;
  imageSrc: string;
  onClick: (id: number) => void;
  disabled?: boolean;
  active?: boolean;
  className?: string;
};

export const Card = ({
  id,
  title,
  imageSrc,
  onClick,
  disabled,
  active,
  className,
}: CardProps) => {
  return (
    <div
      onClick={() => onClick(id)}
      className={cn(
        'h-full border-2 border-slate-700 rounded-xl border-b-4 hover:bg-slate-800 cursor-pointer active:border-b-2 flex flex-col items-center justify-between p-3  min-h-[270px] min-w-[200px]',
        disabled && 'cursor-none opacity-50',
        className
      )}
    >
      <div className="min-h-[24px] w-full flex items-center justify-end">
        {active && (
          <div className="rounded-md bg-green-900 p-1.5">
            <CheckIcon className="h-6 w-6 stroke-[4]" />
          </div>
        )}
      </div>
      <Image
        src={imageSrc}
        alt={title}
        width={93.3}
        height={70}
        className="rounded-lg shadow-md border object-cover"
      />
      <p className="text-slate-400 text-2xl font-bold text-center">{title}</p>
    </div>
  );
};
