import 'dotenv/config';
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';

import * as schema from '@/db/schema';

const sql = neon(process.env.NEON_DATABASE_URL!);

const db = drizzle(sql, { schema });

const reset = async () => {
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
  } catch (err) {
    console.error(err);
    throw new Error('Failed to seed database.!');
  }
};
reset();