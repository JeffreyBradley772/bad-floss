import { mockBrands } from '@/lib/mockData';
import { StarIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default function FlossDetailPage({ params }: { params: { id: string } }) {
  const brand = mockBrands.find(b => b.id === params.id);
  
  if (!brand) {
    notFound();
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <Link 
        href="/"
        className="text-blue-600 hover:text-blue-800 mb-6 inline-block"
      >
        ← Back to all floss
      </Link>

      <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">{brand.name}</h1>
            <p className="text-gray-600 mb-2">by {brand.company}</p>
            <p className="text-lg font-medium">{brand.price}</p>
          </div>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
            {brand.type}
          </span>
        </div>

        <p className="text-gray-700 mb-4">{brand.description}</p>

        <div className="flex items-center gap-4 mb-6">
          <div className="flex items-center">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <StarIcon
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.round(brand.averageRating)
                      ? 'text-yellow-400'
                      : 'text-gray-200'
                  }`}
                />
              ))}
            </div>
            <span className="ml-2 text-gray-600">
              {brand.averageRating.toFixed(1)} ({brand.totalReviews} reviews)
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold mb-4">Reviews</h2>
        {brand.reviews.map((review) => (
          <div key={review.id} className="bg-white shadow rounded-lg p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold mb-2">{review.title}</h3>
                <div className="flex items-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className={`h-4 w-4 ${
                        i < review.rating ? 'text-yellow-400' : 'text-gray-200'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <span className="text-sm text-gray-500">
                {new Date(review.createdAt).toLocaleDateString()}
              </span>
            </div>

            <p className="text-gray-700 mb-4">{review.content}</p>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2">Pros</h4>
                <ul className="list-disc list-inside text-sm text-gray-600">
                  {review.pros.map((pro, index) => (
                    <li key={index}>{pro}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2">Cons</h4>
                <ul className="list-disc list-inside text-sm text-gray-600">
                  {review.cons.map((con, index) => (
                    <li key={index}>{con}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-4 text-sm text-gray-500">
              Reviewed by {review.userName}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
