import { StarIcon } from '@heroicons/react/20/solid';
import { getApiUrl } from '@/lib/utils';
import { mockReviews } from '@/lib/mockData';

async function getReviews() {
  // Comment out the API call for now and return mock data
  // try {
  //   const res = await fetch(getApiUrl('/api/reviews'), { 
  //     cache: 'no-store',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   });
  //   if (!res.ok) return [];
  //   return res.json();
  // } catch (error) {
  //   console.error('Error fetching reviews:', error);
  //   return [];
  // }
  return mockReviews;
}

export default async function ReviewList() {
  const reviews = await getReviews();

  if (reviews.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        <p>No reviews yet. Be the first to share your floss experience!</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {reviews.map((review: any) => (
        <div
          key={review.id}
          className="bg-white shadow rounded-lg p-6 border border-gray-200"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">{review.title}</h2>
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <StarIcon
                  key={i}
                  className={`h-5 w-5 ${
                    i < review.rating ? 'text-yellow-400' : 'text-gray-200'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="mb-4">
            <span className="text-sm font-medium text-gray-500">Brand:</span>
            <span className="ml-2">{review.brand}</span>
          </div>

          <p className="text-gray-600 mb-4">{review.description}</p>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Pros</h3>
              <ul className="list-disc list-inside text-sm text-gray-600">
                {review.pros.map((pro: string, index: number) => (
                  <li key={index}>{pro}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Cons</h3>
              <ul className="list-disc list-inside text-sm text-gray-600">
                {review.cons.map((con: string, index: number) => (
                  <li key={index}>{con}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center">
              <span>By {review.user.name || 'Anonymous'}</span>
              {review.user.image && (
                <img
                  src={review.user.image}
                  alt={review.user.name || 'User'}
                  className="w-6 h-6 rounded-full ml-2"
                />
              )}
            </div>
            <div>
              {new Date(review.createdAt).toLocaleDateString()}
              <span className="mx-2">•</span>
              {review._count.comments} comments
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
