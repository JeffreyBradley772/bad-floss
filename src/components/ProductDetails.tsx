import { getProductByIdAction } from '@/app/actions/products';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Rating, RatingButton } from './ui/shadcn-io/rating';

export default async function ProductDetails({ productId }: { productId: string }) {
  const { product, error } = await getProductByIdAction(productId);

  if (!product || error) {
    notFound();
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-stretch mt-6 h-96 gap-4">
        <div className="bg-white w-3/4 h-full rounded-lg p-4 flex items-center justify-center">
          <Image
            src={product.largeImageUrl || '/placeholder.png'}
            alt={product.name}
            className="max-h-[400px] rounded-md"
            width={400}
            height={400}
          />
        </div>

        <div className="bg-white w-3/4 h-full rounded-lg ">
          <div className="rounded-lg bg-white text-black flex items-center m-4 font-semibold text-lg">
            <strong>{product.name}</strong>
          </div>
          <hr className="mx-4 my-2" />
          <div className="h-1/2 bg-white m-4 rounded-lg text-sm prose text-black overflow-y-auto [&::-webkit-scrollbar]:hidden [scrollbar-width:none]">
            {product.longDescription}
          </div>
          <div className="flex items-end h-1/8">
            <div className="w-1/2 h-full mx-4 rounded-lg flex justify-center items-center">
              {product.walmartRating && (
                <Rating value={product.walmartRating} readOnly>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <RatingButton className="text-yellow-500" key={index} />
                  ))}
                </Rating>
              )}
            </div>
            <div className="w-1/2 h-full ml-auto mr-4 rounded-lg flex justify-center items-center">
              ${product.price ? product.price.toFixed(2) : 'N/A'}
            </div>
          </div>
        </div>
      </div>

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
