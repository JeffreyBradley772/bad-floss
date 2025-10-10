'use client';

import { useFormStatus } from 'react-dom';
import { useActionState, useState, useEffect } from 'react';
import { StarIcon } from '@heroicons/react/20/solid';
import { createReviewAction } from '@/app/actions/reviews';
import { ActionResult, SerializedFlossReview } from '@/lib/types';

const initialState: ActionResult<SerializedFlossReview> = {
  success: false,
};

function SubmitButton({ expanded, onExpand }: { expanded: boolean; onExpand: () => void }) {
  const { pending } = useFormStatus();
  if (expanded) {
    return (
      <button
        type="submit"
        disabled={pending}
        className="mt-6 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
      >
        {pending ? 'Submitting...' : 'Submit Review'}
      </button>
    );
  } else {
    return (
      <button
        type="button"
        onClick={onExpand}
        className="mt-6 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
      >
        Write a Review
      </button>
    );
  }
}

interface CreateReviewFormProps {
  productId: string;
}

export default function CreateReviewForm({ productId }: CreateReviewFormProps) {
  const [state, formAction] = useActionState(createReviewAction, initialState);
  const [rating, setRating] = useState(0);
  const [expanded, setExpanded] = useState(false);

  // Reset form on successful submission
  useEffect(() => {
    if (state.success && state.data) {
      setRating(0);
      setExpanded(false);
    }
  }, [state.success, state.data]);

  return (
    <form action={formAction} className="bg-white shadow rounded-lg p-6 border border-gray-200">
      <h2 className="text-xl font-semibold mb-6">Share Your Floss Experience</h2>

      {/* Hidden productId field */}
      <input type="hidden" name="productId" value={productId} />

      {/* Success message */}
      {state.success && (
        <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
          Review submitted successfully!
        </div>
      )}

      {/* Error message */}
      {state.error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {state.error}
        </div>
      )}

      {expanded && (
        <div className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Review Title *
            </label>
            <input
              type="text"
              name="title"
              id="title"
              required
              maxLength={100}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
            />
            {state.fieldErrors?.title && (
              <p className="mt-1 text-sm text-red-600">{state.fieldErrors.title[0]}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Rating *</label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map(value => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setRating(value)}
                  className="focus:outline-none"
                >
                  <StarIcon
                    className={`h-6 w-6 ${value <= rating ? 'text-yellow-400' : 'text-gray-200'}`}
                  />
                </button>
              ))}
            </div>
            <input type="hidden" name="rating" value={rating} />
            {state.fieldErrors?.rating && (
              <p className="mt-1 text-sm text-red-600">{state.fieldErrors.rating[0]}</p>
            )}
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Review Details *
            </label>
            <textarea
              name="description"
              id="description"
              required
              maxLength={500}
              rows={4}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
              placeholder="Share your experience with this floss..."
            />
            {state.fieldErrors?.description && (
              <p className="mt-1 text-sm text-red-600">{state.fieldErrors.description[0]}</p>
            )}
          </div>
        </div>
      )}

      <SubmitButton expanded={expanded} onExpand={() => setExpanded(true)} />
    </form>
  );
}
