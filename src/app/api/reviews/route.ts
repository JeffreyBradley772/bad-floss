import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';

const reviewSchema = z.object({
  title: z.string().min(1).max(100),  description: z.string().min(1),
  rating: z.number().min(1).max(5),
  productId: z.string().min(1), // Add required productId field
});

export async function GET() {
  try {
    const reviews = await prisma.flossReview.findMany({
      include: {
        user: {
          select: {
            name: true,
            image: true,
          },
        },
        _count: {
          select: { comment: true },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(reviews);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const json = await request.json();
    const parsed = reviewSchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error }, { status: 400 });
    }

    const review = await prisma.flossReview.create({
      data: {
        id: crypto.randomUUID(),
        ...parsed.data,
        userId: session.user.id,
      },
    });

    return NextResponse.json(review);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create review' }, { status: 500 });
  }
}
