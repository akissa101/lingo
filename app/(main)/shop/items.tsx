'use client';

import { refillHearts } from '@/actions/user-progress';
import { createStripeUrl } from '@/actions/user-subscription';
import { Button } from '@/components/ui/button';
import { POINTS_TO_REFIL } from '@/constants';
import Image from 'next/image';
import { startTransition, useTransition } from 'react';
import { toast } from 'sonner';

type ItemsProps = {
  hearts: number;
  points: number;
  hasActiveSubscription: boolean;
};

export const Items = ({
  hearts,
  points,
  hasActiveSubscription,
}: ItemsProps) => {
  const [pending, transition] = useTransition();

  const onFillHearts = () => {
    if (pending || hearts === 5 || points < POINTS_TO_REFIL) {
      return;
    }
    startTransition(() => {
      refillHearts().catch(() =>
        toast.error('Something went wrong to refill hearts')
      );
    });
  };

  const onUpgrade = () => {
    startTransition(() => {
      createStripeUrl()
        .then((res) => {
          if (res.data) {
            window.location.href = res.data;
          }
        })
        .catch((err) => {
          toast.error('Payment process creation failed');
        });
    });
  };

  return (
    <ul className="w-full">
      <div className="w-full flex items-center p-4 gap-x-4 border-t-2 border-slate-700">
        <Image src="/images/heart.svg" alt="heart" width={60} height={60} />
        <p className="flex-1 text-base lg:text-lg text-slate-300 font-bold">
          Refill hearts
        </p>
        <Button
          onClick={onFillHearts}
          variant="sidebarOutline"
          disabled={pending || hearts === 5 || points < POINTS_TO_REFIL}
        >
          {hearts === 5 ? (
            'full'
          ) : (
            <div className="flex items-center gap-3">
              <Image
                src="/images/points.svg"
                alt="points"
                height={20}
                width={20}
              />
              <p className="">{POINTS_TO_REFIL}</p>
            </div>
          )}
        </Button>
      </div>
      <div className="flex items-center w-full p-4 pt-8 gap-x-4 border-t-2 mt-3 border-slate-700">
        <Image
          src="/images/unlimited.svg"
          alt="unlimited"
          height={60}
          width={60}
        />
        <div className="flex-1">
          <p className="text-base lg:text-lg text-slate-300 font-bold">
            Unlimited hearts
          </p>
        </div>
        <Button onClick={onUpgrade} disabled={pending}>
          {hasActiveSubscription ? 'settings' : 'upgrade'}
        </Button>
      </div>
    </ul>
  );
};
