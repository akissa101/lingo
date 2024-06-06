import 'dotenv/config';
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';

import * as schema from '@/db/schema';

const sql = neon(process.env.NEON_DATABASE_URL!);

const db = drizzle(sql, { schema });

const main = async () => {
  try {
    console.log('seeding database');
    await db.delete(schema.courses);
    await db.delete(schema.userProgress);
    await db.delete(schema.units);
    await db.delete(schema.lessons);
    await db.delete(schema.challenges);
    await db.delete(schema.challengeOptions);
    await db.delete(schema.challengeProgress);
    await db.delete(schema.userSubscription);

    await db.insert(schema.courses).values([
      {
        id: 1,
        title: 'Arabic',
        imageSrc: '/flags/sa.svg',
      },
      {
        id: 2,
        title: 'Italic',
        imageSrc: '/flags/ie.svg',
      },
      {
        id: 3,
        title: 'French',
        imageSrc: '/flags/fr.svg',
      },
      {
        id: 4,
        title: 'Somali',
        imageSrc: '/flags/so.svg',
      },
    ]);

    await db.insert(schema.units).values([
      {
        id: 1,
        courseId: 1,
        title: 'unit 1',
        description: 'Learn the basics of arabic language',
        order: 1,
      },
    ]);

    await db.insert(schema.lessons).values([
      {
        id: 1,
        unitId: 1,
        title: 'Nouns',
        order: 1,
      },
      {
        id: 2,
        unitId: 1,
        title: 'Verbs',
        order: 2,
      },
      {
        id: 3,
        unitId: 1,
        title: 'Verbs',
        order: 3,
      },
      {
        id: 4,
        unitId: 1,
        title: 'Verbs',
        order: 4,
      },
      {
        id: 5,
        unitId: 1,
        title: 'Verbs',
        order: 5,
      },
    ]);

    await db.insert(schema.challenges).values([
      {
        id: 1,
        lessonId: 1,
        type: 'SELECT',
        question: 'Which one of these is the "man"?',
        order: 1,
      },
      {
        id: 2,
        lessonId: 1,
        type: 'ASSIST',
        question: 'How to spell woman?',
        order: 2,
      },
      {
        id: 3,
        lessonId: 1,
        type: 'SELECT',
        question: 'How to spell boy?',
        order: 3,
      },
      {
        id: 4,
        lessonId: 2,
        type: 'SELECT',
        question: 'Which one of these is the "man"?',
        order: 1,
      },
      {
        id: 5,
        lessonId: 2,
        type: 'ASSIST',
        question: 'How to spell woman?',
        order: 2,
      },
      {
        id: 6,
        lessonId: 2,
        type: 'SELECT',
        question: 'How to spell boy?',
        order: 3,
      },
    ]);

    await db.insert(schema.challengeOptions).values([
      {
        id: 1,
        challengeId: 1,
        imageSrc: '/images/man.svg',
        correct: true,
        text: 'رجل',
        audioSrc: '/audio/ar_man.m4a',
      },
      {
        id: 2,
        challengeId: 1,
        imageSrc: '/images/woman.svg',
        correct: false,
        text: 'إمرأة',
        audioSrc: '/audio/ar_woman.mp3',
      },
      {
        id: 3,
        challengeId: 1,
        imageSrc: '/images/boy.svg',
        correct: false,
        text: 'ولد',
        audioSrc: '/audio/ar_boy.mp3',
      },
      {
        id: 4,
        challengeId: 2,
        // imageSrc: '/images/man.svg',
        correct: false,
        text: 'رجل',
        audioSrc: '/audio/ar_man.m4a',
      },
      {
        id: 5,
        challengeId: 2,
        // imageSrc: '/images/woman.svg',
        correct: true,
        text: 'إمرأة',
        audioSrc: '/audio/ar_woman.mp3',
      },
      {
        id: 6,
        challengeId: 2,
        // imageSrc: '/images/woman.svg',
        correct: false,
        text: 'ولد',
        audioSrc: '/audio/ar_boy.mp3',
      },
      {
        id: 7,
        challengeId: 3,
        imageSrc: '/images/man.svg',
        correct: false,
        text: 'رجل',
        audioSrc: '/audio/ar_man.m4a',
      },
      {
        id: 8,
        challengeId: 3,
        imageSrc: '/images/woman.svg',
        correct: false,
        text: 'إمرأة',
        audioSrc: '/audio/ar_woman.mp3',
      },
      {
        id: 9,
        challengeId: 3,
        imageSrc: '/images/boy.svg',
        correct: true,
        text: 'ولد',
        audioSrc: '/audio/ar_boy.mp3',
      },
    ]);

    console.log('seeding finished');
  } catch (err) {
    console.error(err);
    throw new Error('Failed to seed database.!');
  }
};
main();
