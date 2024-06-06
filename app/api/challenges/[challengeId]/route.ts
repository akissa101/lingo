import { isAdmin } from '@/db/admin';
import db from '@/db/drizzle';
import { challenges } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

export const GET = async (
  req: Request,
  { params: { challengeId } }: { params: { challengeId: number } }
) => {
  if (!isAdmin) {
    return new NextResponse('Unauthorized', { status: 401 });
  }
  const data = await db.query.challenges.findFirst({
    where: eq(challenges.id, challengeId),
  });

  // console.log(challengeId, data);

  return NextResponse.json(data);
};

export const PUT = async (
  req: Request,
  { params: { challengeId } }: { params: { challengeId: number } }
) => {
  if (!isAdmin) {
    return new NextResponse('Unauthorized', { status: 401 });
  }
  const body = await req.json();
  const data = await db
    .update(challenges)
    .set({ ...body })
    .where(eq(challenges.id, challengeId))
    .returning();

  return NextResponse.json(data[0]);
};

export const DELETE = async (
  req: Request,
  { params: { challengeId } }: { params: { challengeId: number } }
) => {
  if (!isAdmin) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const data = await db
    .delete(challenges)
    .where(eq(challenges.id, challengeId))
    .returning();

  return NextResponse.json(data[0]);
};
