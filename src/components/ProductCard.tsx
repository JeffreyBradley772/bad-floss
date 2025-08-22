import { StarIcon } from '@heroicons/react/16/solid';
import Link from 'next/link';
import Image from 'next/image';
import { SerializedProduct } from '@/lib/models/products';
import { Rating, RatingButton } from '@/components/ui/shadcn-io/rating';

export default function ProductCard({ product }: { product: SerializedProduct }) {
  return (
    <div className="h-full w-full">
      <Link
        key={product.id}
        href={`/floss/${product.id}`}
        className="block h-full transition-transform hover:scale-105"
      >
        <div
          className="bg-white shadow-lg rounded-lg p-6 h-full flex flex-col w-full"
          style={{ minHeight: '400px', maxHeight: '400px' }}
        >
          {/* Image container with fixed height */}
          <div className="flex justify-center items-center h-24 mb-4">
            <Image
              src={product.thumbnailImageUrl || '/placeholder.png'}
              alt={product.name}
              width={75}
              height={75}
              className="w-24 h-24 object-cover rounded-md"
            />
          </div>

          {/* Header section with fixed height */}
          <div className="flex justify-between items-start h-20">
            <div className="overflow-hidden">
              <h2 className="text-xl font-bold mb-1 line-clamp-1 overflow-ellipsis">
                {product.name}
              </h2>
              <h2 className="text-xl font-bold mb-1 line-clamp-1 overflow-ellipsis">
                {product.brand}
              </h2>
            </div>
          </div>

          {/* Description with fixed height */}
          <p className="text-gray-600 h-20 text-sm line-clamp-2 overflow-auto">
            {product.shortDescription}
          </p>

          {/* Ratings section with fixed height */}
          <div className="flex items-center justify-between h-8">
            <div className="flex items-center">
              {product.walmartRating && (
                <span className="mr-2 text-sm text-gray-600">Walmart Rating</span>
              )}
              <div className="flex items-center">
                <div className="flex items-center">
                  {product.walmartRating && (
                    <Rating value={product.walmartRating} readOnly>
                      {Array.from({ length: 5 }).map((_, index) => (
                        <RatingButton className="text-yellow-500" key={index} />
                      ))}
                    </Rating>
                  )}
                </div>
              </div>
            </div>
            <span className="text-sm text-gray-500"># reviews</span>
          </div>

          {/* Footer section with price and view details */}
          <div className="flex justify-between items-end">
            <span className="text-lg font-semibold text-blue-600">
              ${product.price ? product.price.toFixed(2) : 'N/A'}
            </span>
            <span className="text-sm text-blue-600 mt-auto">View Details →</span>
          </div>
        </div>
      </Link>
    </div>
  );
}
