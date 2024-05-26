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
    console.log('seeding finished');
  } catch (err) {
    console.error(err);
    throw new Error('Failed to seed database.!');
  }
};
main();
