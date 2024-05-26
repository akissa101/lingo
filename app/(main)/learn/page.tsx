import { FeedWrapper } from '@/components/feed-wrapper';
import { StickyWrapper } from '@/components/sticky-wrapper';
import React from 'react';
import { Header } from './header';
import { UserProgress } from '@/components/user-progress';
import { getUserProgress } from '@/db/queries';
import { redirect } from 'next/navigation';

type Props = {};

const LearnPage = async ({}: Props) => {
  const [userProgress] = await Promise.all([getUserProgress()]);

  if (!userProgress || !userProgress.activeCourse) {
    redirect('/courses');
  }

  return (
    <div className="flex   gap-4 px-4 ">
      <FeedWrapper>
        <Header title={userProgress.activeCourse.title} />
      </FeedWrapper>

      <StickyWrapper>
        <UserProgress
          activeCourse={userProgress.activeCourse}
          hearts={userProgress.hearts}
          points={userProgress.points}
          hasActiveSubscription={false}
        />
      </StickyWrapper>
    </div>
  );
};

export default LearnPage;
