import { isAdmin } from '@/db/admin';
import db from '@/db/drizzle';
import { challengeOptions } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export const GET = async (req: Request) => {
  if (!isAdmin) {
    return new NextResponse('Unauthorized', { status: 401 });
  }
  const data = await db.query.challengeOptions.findMany();

  // console.log(challengeId, data);

  return NextResponse.json(data);
};

export const POST = async (req: Request) => {
  if (!isAdmin) {
    return new NextResponse('Unauthorized', { status: 401 });
  }
  const body = await req.json();
  const data = await db
    .insert(challengeOptions)
    .values({ ...body })
    .returning();

  return NextResponse.json(data[0]);
};
