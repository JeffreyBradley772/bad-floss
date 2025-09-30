import { z } from 'zod';

// Schema for creating a new review
export const createReviewSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title must be less than 100 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  rating: z.number().min(1, 'Rating must be at least 1').max(5, 'Rating must be at most 5'),
  productId: z.string().min(1, 'Product ID is required'),
});

// Schema for updating a review
export const updateReviewSchema = createReviewSchema.partial().extend({
  id: z.string().min(1, 'Review ID is required'),
});

// Schema for review query parameters
export const reviewQuerySchema = z.object({
  productId: z.string().optional(),
  userId: z.string().optional(),
  rating: z.number().min(1).max(5).optional(),
  limit: z.number().min(1).max(100).default(10),
  offset: z.number().min(0).default(0),
});

// Infer TypeScript types from schemas
export type CreateReviewInput = z.infer<typeof createReviewSchema>;
export type UpdateReviewInput = z.infer<typeof updateReviewSchema>;
export type ReviewQueryParams = z.infer<typeof reviewQuerySchema>;

// Response types (DTOs) - what gets sent to the client
export type ReviewResponse = {
  id: string;
  title: string;
  description: string;
  rating: number;
  productId: string;
  userId: string;
  createdAt: string; // ISO string, not Date object
  updatedAt: string; // ISO string, not Date object
  user: {
    name: string | null;
    image: string | null;
  };
  _count: {
    comments: number;
  };
};
