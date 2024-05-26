import { relations } from 'drizzle-orm';
import { serial, text, pgTable, integer } from 'drizzle-orm/pg-core';

export const courses = pgTable('courses', {
  id: serial('id').primaryKey().notNull(),
  title: text('title').notNull(),

  imageSrc: text('image_src').notNull(),
});

export const coursesRelations = relations(courses, ({ many }) => ({
  userProgress: many(userProgress),
}));

export const userProgress = pgTable('user_progress', {
  userId: text('user_id').primaryKey().notNull(),
  userName: text('user_name').default('user'),
  UserImageSrc: text('user_image_src').notNull().default('/images/logo.svg'),
  activeCourseId: integer('actiive_course_id').references(() => courses.id, {
    onDelete: 'cascade',
  }),
  hearts: integer('hearts').notNull().default(5),
  points: integer('points').notNull().default(0),
});

export const userRelations = relations(userProgress, ({ one }) => ({
  activeCourse: one(courses, {
    fields: [userProgress.activeCourseId],
    references: [courses.id],
  }),
}));
