import React from 'react';

import { getLesson, getUserProgress } from '@/db/queries';
import { redirect } from 'next/navigation';
import { Quiz } from './quiz';

type Props = {};

const LessonPage = async (props: Props) => {
  const [lesson, userProgress] = await Promise.all([
    getLesson(),
    getUserProgress(),
  ]);

  if (!lesson || !userProgress) {
    redirect('/learn');
  }

  const initialPercentage =
    (lesson.challenges.filter((challenge) => challenge.completed).length /
      lesson.challenges.length) *
    100;

  return (
    <Quiz
      initialLessonId={lesson.id}
      initialLessonChallenges={lesson.challenges}
      initialHearts={userProgress.hearts}
      initialPercentage={initialPercentage}
      userSubscribtion={null}
    />
  );
};

export default LessonPage;
