import { SerializedFlossReview } from '@/lib/types';
import { getProductByIdAction } from '@/app/actions/products';
import Image from 'next/image';
import { Rating, RatingButton } from '@/components/ui/shadcn-io/rating';
import Link from 'next/link';

export default async function FulLReviewCard({ review }: { review: SerializedFlossReview }) {
  const productId = review.productId;
  const { data: product, success: productSuccess } = await getProductByIdAction(productId);

  if (!productSuccess || !product?.product) {
    return (
      <div>
        <h1>Product not found</h1>
      </div>
    );
  }

  const productData = product.product;
  const formattedDate = new Date(review.createdAt).toLocaleDateString();

  return (
    <div className="w-full flex justify-center px-2 sm:px-4">
      <Link href={`/floss/${productData.id}`} className="w-full max-w-4xl">
        <div className="h-[280px] sm:h-[220px] flex flex-col sm:flex-row items-center w-full my-2 sm:m-4 p-3 sm:p-4 bg-slate-400 rounded-lg shadow-black shadow-lg hover:scale-105 transition-all">
          <Image
            src={productData.thumbnailImageUrl!}
            alt={productData.name}
            width={80}
            height={80}
            className="rounded-lg w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] object-cover mb-2 sm:mb-0 sm:mr-4"
          />

          <div className="flex flex-col flex-1 w-full overflow-hidden">
            <div className="flex flex-col sm:flex-row items-start sm:items-center w-full gap-1 sm:gap-2 mb-1 sm:mb-2">
              <Rating value={review.rating} readOnly>
                {Array.from({ length: 5 }).map((_, index) => (
                  <RatingButton className="text-yellow-500 text-sm sm:text-base" key={index} />
                ))}
              </Rating>
              <h1 className="text-lg sm:text-xl font-bold sm:ml-2">{review.title}</h1>
            </div>

            <div className="mb-1 sm:mb-2 flex-1">
              <p className="text-xs sm:text-base line-clamp-3 sm:line-clamp-2">
                {review.description}
              </p>
            </div>

            <div className="flex flex-row justify-between w-full text-xs sm:text-sm mt-auto">
              <h1>{review.user?.name?.split(' ')[0]}</h1>
              <h1>{formattedDate}</h1>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
