import { getProductByIdAction } from '@/app/actions/products';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Rating, RatingButton } from '@/components/ui/shadcn-io/rating';
import { ExpandableDescription } from '@/components/ExpandableDescription';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getReviewsByProductIdAction } from '@/app/actions/reviews';
import { ReviewCard } from './reviews/ReviewCard';
import CreateReviewForm from './CreateReviewForm';

export default async function ProductDetails({ productId }: { productId: string }) {
  const { success: productQuerySuccess, data: productData } = await getProductByIdAction(productId);
  if (!productData || !productQuerySuccess) {
    notFound();
  }

  const session = await getServerSession(authOptions);

  const { success: reviewsQuerySuccess, data: reviewsData } =
    await getReviewsByProductIdAction(productId);

  const product = productData.product;

  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="flex flex-col lg:flex-row gap-6 mt-6">
        {/* Sticky Image Container */}
        <div className="w-full lg:w-1/2 lg:sticky lg:top-6 lg:self-start">
          <div className="bg-white rounded-lg p-4 lg:p-6 shadow-sm">
            <div className="relative w-full">
              <Image
                src={product?.largeImageUrl || '/placeholder.png'}
                alt={product?.name || ''}
                width={600}
                height={600}
                className="w-full h-auto max-h-[30vh] lg:max-h-[30vh] object-contain rounded-lg"
                priority
              />
            </div>
          </div>
        </div>

        {/* Content Container */}
        <div className="w-full lg:w-1/2 space-y-4">
          {/* Product Name */}
          <div className="bg-white rounded-lg p-4 lg:p-6 shadow-sm">
            <h1 className="text-xl lg:text-2xl font-bold text-gray-900">{product?.name}</h1>
          </div>

          {/* Description Section */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-4 lg:pl-6 pb-0">
              <h2 className="text-lg lg:text-xl font-semibold text-gray-900">Description</h2>
            </div>
            <div className="px-4 lg:pl-6 pb-4 lg:pb-6">
              <ExpandableDescription description={product?.longDescription || ''} />
            </div>
          </div>

          {/* Rating and Price Section */}
          <div className="bg-white rounded-lg p-4 lg:p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
              <div className="flex items-center gap-3">
                {product?.walmartRating && (
                  <>
                    <Rating value={product.walmartRating} readOnly>
                      {Array.from({ length: 5 }).map((_, index) => (
                        <RatingButton className="text-yellow-500" key={index} />
                      ))}
                    </Rating>
                    <span className="text-gray-600 font-medium">{product.walmartRating}</span>
                  </>
                )}
              </div>
              {product?.price && (
                <div className="text-2xl lg:text-3xl font-bold text-green-600">
                  ${product.price.toString()}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-2 rounded-lg">
        <div className="mb-2">
          {session ? (
            <CreateReviewForm productId={productId} />
          ) : (
            <div className="flex items-center bg-white rounded-lg p-2 justify-center">
              <a href="/auth/signin" className="text-blue-600 font-semibold hover:underline">
                Please sign in to write a review
              </a>
            </div>
          )}
        </div>
        {reviewsQuerySuccess && reviewsData?.length > 0 ? (
          reviewsData?.map(review => {
            return <ReviewCard key={review.id} review={review} session={session} />;
          })
        ) : (
          <div className="flex mb-2 items-center font-semibold justify-center bg-transparent">
            <p>No reviews yet...</p>
          </div>
        )}
      </div>
    </div>
  );
}
