'use client';

import { deleteReviewAction } from "@/app/actions/reviews";
import { useRouter } from 'next/navigation';

interface DeleteReviewButtonProps {
  reviewId: string;
  onDelete?: () => void;
}

export function DeleteReviewButton({ reviewId, onDelete }: DeleteReviewButtonProps) {
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this review?')) {
      return;
    }

    try {
      const result = await deleteReviewAction(reviewId);
      if (result.success) {
        // Refresh the server component data
        router.refresh();
        onDelete?.();
      }
    } catch (error) {
      console.error('Failed to delete review:', error);
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 text-sm transition-colors"
    >
      Delete
    </button>
  );
}
