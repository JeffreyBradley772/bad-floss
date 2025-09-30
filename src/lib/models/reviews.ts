import { prisma } from '@/lib/prisma';
import { CreateReviewInput } from '@/lib/schemas/review';
import { FlossReview, User } from '@prisma/client';
import { ActionResult, SerializedFlossReview } from '@/lib/types';

// Utility function to serialize review data for client components
function serializeReview(
  review: FlossReview & {
    user: Pick<User, 'name' | 'image'>;
    _count: { comment: number };
  }
): SerializedFlossReview {
  return {
    id: review.id,
    title: review.title,
    productId: review.productId,
    description: review.description,
    rating: review.rating,
    userId: review.userId,
    createdAt: review.createdAt.toISOString(),
    updatedAt: review.updatedAt.toISOString(),
    user: {
      name: review.user.name,
      image: review.user.image,
    },
    _count: {
      comments: review._count.comment,
    },
  };
}

export async function deleteReview(reviewId: string): Promise<ActionResult<void>> {
  try {
    await prisma.flossReview.delete({
      where: {
        id: reviewId,
      },
    });
    return {
      success: true,
    };
  } catch (error) {
    console.error('Error deleting review:', error);
    return {
      success: false,
    };
  }
}

export async function getReviewsByProductId(
  productId: string
): Promise<ActionResult<SerializedFlossReview[]>> {
  try {
    const reviews = await prisma.flossReview.findMany({
      where: {
        productId: productId,
      },
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

    const serializedReviews = reviews.map(serializeReview);

    return {
      success: true,
      data: serializedReviews,
    };
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return {
      success: false,
      error: 'Failed to fetch reviews',
    };
  }
}

export async function createReview(
  input: CreateReviewInput,
  userId: string
): Promise<ActionResult<SerializedFlossReview>> {
  try {
    const review = await prisma.flossReview.create({
      data: {
        id: crypto.randomUUID(),
        ...input,
        userId,
      },
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
    });

    const serializedReview = serializeReview(review);

    return {
      success: true,
      data: serializedReview,
    };
  } catch (error) {
    console.error('Error creating review:', error);
    return {
      success: false,
      error: 'Failed to create review',
    };
  }
}

export async function getAllReviews(): Promise<ActionResult<SerializedFlossReview[]>> {
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

    const serializedReviews = reviews.map(serializeReview);

    return {
      success: true,
      data: serializedReviews,
    };
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return {
      success: false,
      error: 'Failed to fetch reviews',
    };
  }
}
