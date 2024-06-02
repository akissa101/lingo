import { Progress } from '@/components/ui/progress';
import { useExitModal } from '@/store/use-exit-modal';
import { InfinityIcon, X } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

type Props = {
  hearts: number;
  percentage: number;
  hasActiveSubscription: boolean;
};

export const Header = ({
  hearts,
  percentage,
  hasActiveSubscription,
}: Props) => {
  const { open } = useExitModal();

  return (
    <header className="lg:pt-[50px] pt-[20px] px-10 flex gap-x-7 items-center justify-between max-w-[1140px] mx-auto w-full ">
      <X
        size={36}
        onClick={open}
        className="text-rose-400 hover:opacity-75 transition p-1 hover:bg-slate-700 cursor-pointer"
      />
      <Progress value={percentage} />
      <div className="text-rose-500 flex items-center font-bold">
        <Image
          src="/images/heart.svg"
          alt="heart"
          height={28}
          width={28}
          className="mr-2"
        />
        {hasActiveSubscription ? (
          <InfinityIcon className="h-6 w-6 stroke-[3]" />
        ) : (
          hearts
        )}
      </div>
    </header>
  );
};
