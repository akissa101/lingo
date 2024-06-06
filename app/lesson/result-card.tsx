import Image from 'next/image';

import { cn } from '@/lib/utils';

type ResultCardProps = {
  value: number;
  varient: 'points' | 'hearts';
};

export const ResultCard = ({ value, varient }: ResultCardProps) => {
  const imageSrc =
    varient === 'hearts' ? '/images/heart.svg' : '/images/points.svg';

  return (
    <div
      className={cn(
        'rounded-2xl border-2 w-full',
        varient === 'points' && 'bg-orange-900 border-orange-900',
        varient === 'hearts' && 'bg-rose-900 border-rose-900'
      )}
    >
      <div
        className={cn(
          'p-2 rounded-t-xl font-bold text-center uppercase text-xs',
          varient === 'hearts' && 'bg-rose-900 ',
          varient === 'points' && 'bg-orange-900'
        )}
      >
        {varient === 'points' ? 'hearts left' : 'total xp'}
      </div>
      <div
        className={cn(
          'rounded-xl items-center flex justify-center bg-slate-800 p-6 font-bold text-lg gap-x-3',
          varient === 'points' && 'text-orange-500',
          varient === 'hearts' && 'text-rose-500'
        )}
      >
        <Image src={imageSrc} alt="Icon" width={30} height={30} />
        {value}
      </div>
    </div>
  );
};
