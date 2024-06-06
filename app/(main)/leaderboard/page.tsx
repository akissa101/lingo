import { redirect } from 'next/navigation';
import React from 'react';

import { StickyWrapper } from '@/components/sticky-wrapper';
import { UserProgress } from '@/components/user-progress';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import {
  getUserProgress,
  getUserSubscription,
  getTopUsers,
} from '@/db/queries';
import { FeedWrapper } from '@/components/feed-wrapper';
import Image from 'next/image';
import { Promo } from '@/components/promo';
import { Quests } from '@/components/quests';

const Leaderboard = async () => {
  const [userProgress, userSubscription, leaderboard] = await Promise.all([
    getUserProgress(),
    getUserSubscription(),
    getTopUsers(),
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
          <Image
            src="/images/leaderboard.svg"
            alt="leaderboard"
            height={100}
            width={100}
          />
        </div>
        <h1 className="text-center font-bold text-2xl my-6">Leaderboard</h1>
        <p className="text-lg text-center text-muted-foreground mb-6">
          See where you stand among other learners in the community
        </p>
        <Separator className="bg-slate-700 mb-4 h-0.5 rounded-full" />
        {leaderboard.map((user, index) => (
          <div
            key={user.userId}
            className="flex items-center w-full p-2 px-4 rounded-xl hover:bg-green-950"
          >
            <p className="font-bold text-lime-300 mr-4">{index + 1}</p>
            <Avatar className="border border-slate-700 bg-purple-900/90 w-10 h-10 mr-6">
              <AvatarImage
                src={userProgress.userImageSrc}
                className="object-cover"
              />
            </Avatar>
            <p className="font-bold flex-1 text-slate-300">{user.userName}</p>
            <p className="text-muted-foreground">{user.points}</p>
          </div>
        ))}
      </FeedWrapper>
    </div>
  );
};

export default Leaderboard;
