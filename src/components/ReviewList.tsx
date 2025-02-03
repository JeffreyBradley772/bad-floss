import { StarIcon } from '@heroicons/react/20/solid';
import { mockBrands } from '@/lib/mockData';
import Link from 'next/link';

async function getBrands() {
  // In the future, this will fetch from the API
  return mockBrands;
}

export default async function ReviewList() {
  const brands = await getBrands();

  if (brands.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        <p>No floss brands reviewed yet. Be the first to share your experience!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {brands.map((brand) => (
        <Link 
          key={brand.id}
          href={`/floss/${brand.id}`}
          className="block transition-transform hover:scale-105"
        >
          <div className="bg-white shadow-lg rounded-lg p-6 h-full">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-bold mb-1">{brand.name}</h2>
                <p className="text-sm text-gray-600">{brand.company}</p>
              </div>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {brand.type}
              </span>
            </div>

            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
              {brand.description}
            </p>

            <div className="flex items-center justify-between">
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
                <span className="ml-2 text-sm text-gray-600">
                  {brand.averageRating.toFixed(1)}
                </span>
              </div>
              <span className="text-sm text-gray-500">
                {brand.totalReviews} reviews
              </span>
            </div>

            <div className="mt-4 flex justify-between items-center">
              <span className="text-lg font-semibold text-blue-600">
                {brand.price}
              </span>
              <span className="text-sm text-blue-600">
                View Details →
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
