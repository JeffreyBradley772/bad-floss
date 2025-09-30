import { SerializedFlossReview } from '@/lib/types';
import { Rating, RatingButton } from '@/components/ui/shadcn-io/rating';
import Image from 'next/image';
import { Session } from 'next-auth';
import { DeleteReviewButton } from './DeleteReviewButton';

export function ReviewCard({ review, session }: { review: SerializedFlossReview; session: Session | null }) {
  const isSessionUsersReview = session?.user?.id === review.userId;
  const timestamp = new Date(review.createdAt);
  const formattedDate = timestamp.toLocaleDateString();
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm mb-4">
      <div className="flex justify-between">
        <div className="pl-1 flex items-center gap-2">
          {review.user?.image && (
            <Image
              src={review.user.image}
              alt="User Image"
              width={40}
              height={40}
              className="rounded-full mr-2"
            />
          )}
          <h3 className="pl-1 text-sm font-semibold text-black">{review.user?.name}</h3>
        </div>

        {isSessionUsersReview && (
          <DeleteReviewButton reviewId={review.id} />
        )}
      </div>

      <div className="flex items-center gap-2">
        <Rating value={review.rating} readOnly>
          {Array.from({ length: 5 }).map((_, index) => (
            <RatingButton className="text-yellow-500" key={index} />
          ))}
        </Rating>
        <h3 className="text-lg font-semibold text-black">{review.title}</h3>
      </div>
      <p className="pl-1 text-sm text-gray-600">{formattedDate}</p>
      <div className="border-t border-gray-200" />

      <p className="pl-1 text-sm text-gray-600">{review.description}</p>
    </div>
  );
}
