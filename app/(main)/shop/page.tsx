import { redirect } from 'next/navigation';
import React from 'react';

import { StickyWrapper } from '@/components/sticky-wrapper';
import { UserProgress } from '@/components/user-progress';
import { getUserProgress, getUserSubscription } from '@/db/queries';
import { FeedWrapper } from '@/components/feed-wrapper';
import Image from 'next/image';
import { Items } from './items';
import { currentUser, auth } from '@clerk/nextjs/server';
import { Promo } from '@/components/promo';
import { Quests } from '@/components/quests';

type Props = {};

const ShopPage = async (props: Props) => {
  const [userProgress, userSubscription] = await Promise.all([
    getUserProgress(),
    getUserSubscription(),
  ]);
  if (!userProgress || !userProgress.activeCourse) {
    redirect('/learn');
  }

  const isPro = !!userSubscription?.isActive;

  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
      <StickyWrapper>
        <UserProgress
          activeCourse={userProgress.activeCourse}
          hearts={userProgress.hearts}
          points={userProgress.points}
          hasActiveSubscription={isPro}
        />
        {!isPro && <Promo />}
        <Quests points={userProgress.points} />
      </StickyWrapper>
      <FeedWrapper>
        <div className="w-full flex flex-col items-center">
          <Image src="/images/shop.svg" alt="shop" height={100} width={100} />
        </div>
        <h1 className="text-center font-bold text-2xl my-6">Shop</h1>
        <p className="text-lg text-center text-muted-foreground mb-6">
          Spend your points on cool staff
        </p>
        <Items
          hearts={userProgress.hearts}
          points={userProgress.points}
          hasActiveSubscription={!!userSubscription?.isActive}
        />
      </FeedWrapper>
    </div>
  );
};

export default ShopPage;
