'use client';

import { redirect, useRouter } from 'next/navigation';
import { useTransition } from 'react';

import { courses, userProgress } from '@/db/schema';
import { Card } from './card';
import { cursorTo } from 'readline';
import { upsertUserProgress } from '@/actions/user-progress';
import { toast } from 'sonner';

type CoursesListProps = {
  courses: (typeof courses.$inferSelect)[];
  activeCourseId?: typeof userProgress.$inferSelect.activeCourseId;
};

export const CoursesList = ({ courses, activeCourseId }: CoursesListProps) => {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const onClick = (id: number) => {
    if (pending) return;

    if (id === activeCourseId) {
      return redirect('/learn');
    }

    startTransition(() => {
      upsertUserProgress(id).catch(() => {
        toast.error('Something went wrong!');
      });
    });
  };

  return (
    <div className="pt-6 grid  grid-cols-2 lg:grid-cols-[repeat(4,minmax(210px,1fr))] gap-4">
      {/*    auto-cols-[minmax(210px,_1fr)]*/}
      {courses.map((course) => (
        <Card
          key={course.id}
          id={course.id}
          title={course.title}
          imageSrc={course.imageSrc}
          onClick={onClick}
          disabled={pending}
          active={course.id === activeCourseId}
        />
      ))}
    </div>
  );
};
