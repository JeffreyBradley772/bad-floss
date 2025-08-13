import { StarIcon } from '@heroicons/react/16/solid';
import Link from 'next/link';
import Image from 'next/image';
import { SerializedProduct } from '@/lib/models/products';

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
          <div className="flex justify-between items-start mb-4 h-20">
            <div className="overflow-hidden">
              <h2 className="text-xl font-bold mb-1 line-clamp-1 overflow-ellipsis">
                {product.name}
              </h2>
              <h2 className="text-xl font-bold mb-1 line-clamp-1 overflow-ellipsis">
                {product.brand}
              </h2>
            </div>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 whitespace-nowrap">
              {product.walmartRating}
            </span>
          </div>

          {/* Description with fixed height */}
          <p className="text-gray-600 h-12 text-sm mb-4 line-clamp-2 overflow-hidden">
            {product.shortDescription}
          </p>

          {/* Ratings section with fixed height */}
          <div className="flex items-center justify-between h-8">
            <div className="flex items-center">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <StarIcon
                    key={i}
                    className={`h-5 w-5 ${i < 4 ? 'text-yellow-400' : 'text-gray-200'}`}
                  />
                ))}
              </div>
              <span className="ml-2 text-sm text-gray-600">rating</span>
            </div>
            <span className="text-sm text-gray-500"># reviews</span>
          </div>

          {/* Footer section with price and view details */}
          <div className="mt-auto pt-4 flex justify-between items-center">
            <span className="text-lg font-semibold text-blue-600">
              ${product.price ? product.price.toFixed(2) : 'N/A'}
            </span>
            <span className="text-sm text-blue-600">View Details →</span>
          </div>
        </div>
      </Link>
    </div>
  );
}
