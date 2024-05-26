'use server';

import { auth, currentUser } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';

import db from '@/db/drizzle';
import { getCourseById, getUserProgress } from '@/db/queries';
import { userProgress } from '@/db/schema';
import { redirect } from 'next/navigation';

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
