import FullReviewCard from "@/components/reviews/FullReviewCard";
import { getAllReviews } from "@/lib/models/reviews";


export default async function ReviewsPage() {
    const {data: reviews, success: reviewsSuccess} = await getAllReviews();
    
    return (

        <div className="flex flex-col items-center h-screen pt-10">
            <div className="flex flex-col items-center justify-center">
                {reviewsSuccess ? (
                    reviews?.map((review) => (
                        <FullReviewCard key={review.id} review={review} />
                    ))
                ) : (
                    <p>Failed to load reviews</p>
                )}
            </div>

        </div>
    )
}