import { isAdmin } from '@/db/admin';
import db from '@/db/drizzle';
import { units } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

export const GET = async (
  req: Request,
  { params: { unitId } }: { params: { unitId: number } }
) => {
  if (!isAdmin) {
    return new NextResponse('Unauthorized', { status: 401 });
  }
  const data = await db.query.units.findFirst({
    where: eq(units.id, unitId),
  });

  // console.log(unitId, data);
  return NextResponse.json(data);
};

export const PUT = async (
  req: Request,
  { params: { unitId } }: { params: { unitId: number } }
) => {
  if (!isAdmin) {
    return new NextResponse('Unauthorized', { status: 401 });
  }
  const body = await req.json();
  const data = await db
    .update(units)
    .set({ ...body })
    .where(eq(units.id, unitId))
    .returning();

  return NextResponse.json(data[0]);
};

export const DELETE = async (
  req: Request,
  { params: { unitId } }: { params: { unitId: number } }
) => {
  if (!isAdmin) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const data = await db.delete(units).where(eq(units.id, unitId)).returning();

  return NextResponse.json(data[0]);
};
