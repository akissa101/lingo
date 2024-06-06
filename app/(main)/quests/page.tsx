import { redirect } from 'next/navigation';
import React from 'react';

import { StickyWrapper } from '@/components/sticky-wrapper';
import { UserProgress } from '@/components/user-progress';
import {
  getUserProgress,
  getUserSubscription,
  getTopUsers,
} from '@/db/queries';
import { FeedWrapper } from '@/components/feed-wrapper';
import Image from 'next/image';
import { Progress } from '@/components/ui/progress';
import { Promo } from '@/components/promo';
import { quest } from '@/constants';

const QuestsPage = async () => {
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
          hasActiveSubscription={!!userSubscription?.isActive}
        />
        {!isPro && <Promo />}
      </StickyWrapper>
      <FeedWrapper>
        <div className="w-full flex flex-col items-center">
          <Image src="/images/quest.svg" alt="quest" height={100} width={100} />
        </div>
        <h1 className="text-center font-bold text-2xl my-6">Quest</h1>
        <p className="text-lg text-center text-muted-foreground mb-6">
          Complete quest by earning points
        </p>

        <ul className="w-full">
          {quest.map((q) => {
            const progress = (userProgress.points / q.value) * 100;
            // console.log(userProgress.points, q.value, progress);
            return (
              <div
                key={q.title}
                className="flex items-center w-full p-4 gap-x-4 border-t-2 border-slate-800"
              >
                <Image
                  src="/images/points.svg"
                  alt="quest"
                  width={60}
                  height={60}
                />
                <div className="flex flex-col gap-y-2 w-full">
                  <p className="text-xl text-slate-300 font-bold">{q.title}</p>
                  <Progress value={progress} className="h-1" />
                </div>
              </div>
            );
          })}
        </ul>
      </FeedWrapper>
    </div>
  );
};

export default QuestsPage;
