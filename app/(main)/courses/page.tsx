import { getCourses, getUserProgress } from '@/db/queries';
import React from 'react';
import { CoursesList } from './courses-list';

type Props = {};

const Courses = async (props: Props) => {
  const [courses, userProgress] = await Promise.all([
    getCourses(),
    getUserProgress(),
  ]);

  return (
    <div className="h-full max-w-[912px] mx-auto px-3">
      <h1 className="text-3xl  text-slate-300">Language Courses</h1>

      <CoursesList
        courses={courses}
        activeCourseId={userProgress?.activeCourseId}
      />
    </div>
  );
};

export default Courses;
