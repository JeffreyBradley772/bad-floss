import { SerializedFlossReview } from "@/lib/types";
import { getProductByIdAction } from "@/app/actions/products";
import Image from "next/image";
import { Rating, RatingButton } from "@/components/ui/shadcn-io/rating";
import Link from "next/link";

export default async function FulLReviewCard({review}: {review: SerializedFlossReview}) {

    const productId = review.productId;

    const {data: product, success: productSuccess} = await getProductByIdAction(productId);

    if (!productSuccess) {
        return (
            <div>
                <h1>Product not found</h1>
            </div>
        )
    }
    const formattedDate = new Date(review.createdAt).toLocaleDateString();
    

    return (
        <div className="flex flex-col items-center justify-center w-9/12" >
            <Link href={`/floss/${product?.product?.id}`}>
            <div className="flex justify-start items-center w-full max-w-4xl m-4 p-4 bg-slate-400 rounded-lg shadow-black shadow-lg hover:scale-105 transition-all">
                <Image
                    src={product?.product?.thumbnailImageUrl!}
                    alt={product?.product?.name!}
                    width={100}
                    height={100}
                    className="rounded-lg"
                />
                <div className="flex flex-col items-center p-4 flex-1">
                    <div className="flex justify-start w-full">
                        <Rating value={review.rating} readOnly>
                            {Array.from({ length: 5 }).map((_, index) => (
                                <RatingButton className="text-yellow-500" key={index} />
                            ))}
                        </Rating>
                        <h1 className="text-xl font-bold ml-2">{review.title}</h1>
                    </div>
                    <div>
                        <p className="sm:text-[min(10vw, 70px)]">{review.description}</p>
                    </div>
                    <div className="sm:flex flex-col justify-between w-full">
                        <h1>{review.user?.name?.split(" ")[0]}</h1>
                        <h1>{formattedDate}</h1>
                    </div>
                    
                </div>
            </div>
            </Link>
        </div>
    )
}