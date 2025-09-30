export default function ProductDetailsSkeleton() {
  return (
    <div className="max-w-6xl mx-auto px-4 animate-pulse">
      <div className="flex gap-6 mt-6">
        {/* Sticky Image Container Skeleton */}
        <div className="w-1/2 sticky top-6 self-start">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="relative w-full">
              <div className="w-full h-[400px] bg-gray-300 rounded-lg"></div>
            </div>
          </div>
        </div>

        {/* Content Container Skeleton */}
        <div className="w-1/2 space-y-4">
          {/* Product Name Skeleton */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="h-8 bg-gray-300 rounded w-3/4"></div>
          </div>

          {/* Description Section Skeleton */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6 pb-2">
              <div className="h-6 bg-gray-300 rounded w-32 mb-4"></div>
            </div>
            <div className="px-6 pb-6 space-y-3">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded w-4/5"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          </div>

          {/* Rating and Price Section Skeleton */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                {/* Rating stars skeleton */}
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <div key={index} className="w-5 h-5 bg-gray-300 rounded"></div>
                  ))}
                </div>
                <div className="h-4 bg-gray-300 rounded w-8"></div>
              </div>
              {/* Price skeleton */}
              <div className="h-8 bg-gray-300 rounded w-20"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom section skeleton (reviews area) */}
      <div className="bg-gray-300 h-96 mt-4 rounded-lg pt-1">
        <div className="h-4 bg-gray-500 m-4 rounded-lg"></div>
        <div className="h-4 bg-gray-500 m-4 rounded-lg"></div>
        <div className="h-4 bg-gray-500 m-4 rounded-lg"></div>
        <div className="h-4 bg-gray-500 m-4 rounded-lg"></div>
        <div className="h-4 bg-gray-500 m-4 rounded-lg"></div>
        <div className="h-4 bg-gray-500 m-4 rounded-lg"></div>
      </div>
    </div>
  );
}
