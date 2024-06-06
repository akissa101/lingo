import { FeedWrapper } from '@/components/feed-wrapper';
import { StickyWrapper } from '@/components/sticky-wrapper';
import React from 'react';
import { Header } from './header';
import { UserProgress } from '@/components/user-progress';
import {
  getCourseProgress,
  getLessonPercentage,
  getUnits,
  getUserProgress,
  getUserSubscription,
} from '@/db/queries';
import { lessons, units as unitSchema } from '@/db/schema';
import { redirect } from 'next/navigation';
import { Unit } from './unit';
import { Promo } from '@/components/promo';
import { Quests } from '@/components/quests';

type Props = {};

const LearnPage = async ({}: Props) => {
  const [
    userProgress,
    units,
    courseProgress,
    lessonPercentage,
    userSubscription,
  ] = await Promise.all([
    getUserProgress(),
    getUnits(),
    getCourseProgress(),
    getLessonPercentage(),
    getUserSubscription(),
  ]);

  if (!userProgress || !userProgress.activeCourse) {
    redirect('/courses');
  }

  if (!courseProgress) {
    redirect('/courses');
  }

  const isPro = !!userSubscription?.isActive;

  return (
    <div className="flex flex-row-reverse gap-4 px-4 ">
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
        <Header title={userProgress.activeCourse.title} />
        {units.map((unit) => (
          <div key={unit.id} className="mb-10">
            <Unit
              id={unit.id}
              order={unit.order}
              description={unit.description}
              title={unit.title}
              lessons={unit.lessons}
              activeLesson={
                courseProgress.activeLesson as
                  | (typeof lessons.$inferSelect & {
                      unit: typeof unitSchema.$inferSelect;
                    })
                  | undefined
                  | any
              }
              activeLessonPercentage={lessonPercentage}
            />
          </div>
        ))}
      </FeedWrapper>
    </div>
  );
};

export default LearnPage;
