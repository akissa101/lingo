'use server';

import { auth, currentUser } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';
import { and, eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';

import db from '@/db/drizzle';
import { getCourseById, getUserProgress } from '@/db/queries';
import { challengeProgress, challenges, userProgress } from '@/db/schema';

export const upsertUserProgress = async (courseId: number) => {
  const { userId } = await auth();
  const user = await currentUser();
  if (!userId || !user) {
    throw new Error('Unauthorized');
  }

  const course = await getCourseById(courseId);
  if (!course) {
    throw new Error('Course not found');
  }
  //TODO enable once units and lessons are set
  //   if (!course.units.length || !course.units[0].length) {
  //     throw new Error('Course is empty');
  //   }

  const existingUserProgress = await getUserProgress();
  if (existingUserProgress) {
    await db.update(userProgress).set({
      activeCourseId: courseId,
      userName: user.firstName || 'user',
      UserImageSrc: user.imageUrl || '/images/logo.svg',
    });
    revalidatePath('/courses');
    revalidatePath('/learn');
    redirect('/learn');
  }
  await db.insert(userProgress).values({
    userId,
    activeCourseId: courseId,
    userName: user.firstName || 'user',
    UserImageSrc: user.imageUrl || '/images/logo.svg',
  });
  revalidatePath('/courses');
  revalidatePath('/learn');
  redirect('/learn');
};

export const reduceHearts = async (challengeId: number) => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error('Unauthorized');
  }

  const currentUserProgress = await getUserProgress();
  // TODO get user subscrtioption

  // console.log('currentUserProgress:', currentUserProgress);

  const challenge = await db.query.challenges.findFirst({
    where: eq(challenges.id, challengeId),
  });
  // console.log('challenge: ', challenge);
  if (!challenge) {
    throw new Error('Challenge not found');
  }

  const lessonId = challenge.lessonId;

  const existingChallengeProgress = await db.query.challengeProgress.findFirst({
    where: and(
      eq(challengeProgress.userId, userId),
      eq(challengeProgress.challengeId, challengeId)
    ),
  });

  // console.log('existingChallengeProgress:', existingChallengeProgress);
  const isPractice = !!existingChallengeProgress;
  if (isPractice) {
    return { error: 'practice' };
  }

  if (!currentUserProgress) {
    throw new Error('User progress not found');
  }

  //TODO handle subscription

  if (currentUserProgress.hearts === 0) {
    return { error: 'hearts' };
  }

  await db
    .update(userProgress)
    .set({
      hearts: Math.max(currentUserProgress.hearts - 1, 0),
    })
    .where(eq(userProgress.userId, userId));

  revalidatePath('/shop');
  revalidatePath('/learn');
  revalidatePath('/quesst');
  revalidatePath('/leaderboard');
  revalidatePath(`/lesson/${lessonId}`);
};
