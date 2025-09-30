'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { createReviewSchema, CreateReviewInput } from '@/lib/schemas/review';
import { createReview, getReviewsByProductId, getAllReviews, deleteReview } from '@/lib/models/reviews';
import { ActionResult, SerializedFlossReview } from '@/lib/types';

export async function createReviewAction(
  prevState: any,
  formData: FormData
): Promise<ActionResult<SerializedFlossReview>> {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return {
        success: false,
        error: 'You must be logged in to create a review',
      };
    }

    // Extract and validate form data
    const rawData = {
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      rating: Number(formData.get('rating')),
      productId: formData.get('productId') as string,
    };

    // Validate with Zod schema
    const validationResult = createReviewSchema.safeParse(rawData);
    if (!validationResult.success) {
      return {
        success: false,
        error: 'Invalid form data',
        fieldErrors: validationResult.error.flatten().fieldErrors,
      };
    }

    // Create the review
    const result = await createReview(validationResult.data, session.user.id);
    
    if (result.success) {
      // Revalidate relevant pages
      revalidatePath('/');
      revalidatePath(`/products/${validationResult.data.productId}`);
    }

    return result;
  } catch (error) {
    console.error('Error in createReviewAction:', error);
    return {
      success: false,
      error: 'An unexpected error occurred',
    };
  }
}

export async function getReviewsByProductIdAction(productId: string): Promise<ActionResult<SerializedFlossReview[]>> {
  return await getReviewsByProductId(productId);
}

export async function getAllReviewsAction(): Promise<ActionResult<SerializedFlossReview[]>> {
  return await getAllReviews();
}

export async function deleteReviewAction(reviewId: string): Promise<ActionResult<void>> {
  return await deleteReview(reviewId);
}