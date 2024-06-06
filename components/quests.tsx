import Image from 'next/image';
import { Button } from './ui/button';
import Link from 'next/link';
import { quest } from '@/constants';
import { Progress } from './ui/progress';

type PromoProps = {
  points: number;
};

export const Quests = ({ points }: PromoProps) => {
  return (
    <div className="border-2 border-slate-700  rounded-xl p-4  space-y-4 mx-2 ">
      <div className="font-bold text-lg flex items-center justify-between gap-x-4 w-full">
        <h3 className="">Quests</h3>
        <Link href="/quests">
          <Button variant="primaryOutline" size="sm" className="w-full">
            Upgrade Now
          </Button>
        </Link>{' '}
      </div>
      <ul className="w-full space-y-4">
        {quest.map((q) => {
          const progress = (points / q.value) * 100;

          return (
            <div
              key={q.title}
              className="flex items-center w-full pb-4 gap-x-4 "
            >
              <Image
                src="/images/points.svg"
                alt="quest"
                width={35}
                height={35}
              />
              <div className="flex flex-col gap-y-2 w-full">
                <p className="text-base text-slate-300 font-bold">{q.title}</p>
                <Progress value={progress} className="h-1" />
              </div>
            </div>
          );
        })}
      </ul>
    </div>
  );
};
