import { isAdmin } from '@/db/admin';
import db from '@/db/drizzle';
import { lessons } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

export const GET = async (
  req: Request,
  { params: { lessonId } }: { params: { lessonId: number } }
) => {
  if (!isAdmin) {
    return new NextResponse('Unauthorized', { status: 401 });
  }
  const data = await db.query.lessons.findFirst({
    where: eq(lessons.id, lessonId),
  });

  // console.log(lessonId, data);
  return NextResponse.json(data);
};

export const PUT = async (
  req: Request,
  { params: { lessonId } }: { params: { lessonId: number } }
) => {
  if (!isAdmin) {
    return new NextResponse('Unauthorized', { status: 401 });
  }
  const body = await req.json();
  const data = await db
    .update(lessons)
    .set({ ...body })
    .where(eq(lessons.id, lessonId))
    .returning();

  return NextResponse.json(data[0]);
};

export const DELETE = async (
  req: Request,
  { params: { lessonId } }: { params: { lessonId: number } }
) => {
  if (!isAdmin) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const data = await db
    .delete(lessons)
    .where(eq(lessons.id, lessonId))
    .returning();

  return NextResponse.json(data[0]);
};