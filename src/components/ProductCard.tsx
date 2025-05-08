import { StarIcon } from "@heroicons/react/16/solid";
import Link from "next/link";
import Image from "next/image";

// Define a serialized version of FlossProduct
type SerializedProduct = {
  id: string;
  name: string;
  brand: string;
  description: string | null;
  type: string;
  price: number | null;
  imageUrl: string | null;
  createdAt: string;
  updatedAt: string;
};

export default function ProductCard({ product }: { product: SerializedProduct }) {
    return (
        <div>
            <Link
                key={product.id}
                href={`/floss/${product.id}`}
                className="block transition-transform hover:scale-105"
            >
                <div className="bg-white shadow-lg rounded-lg p-6 h-full">
                    <div className="flex justify-center items-center mb-4">
                        <Image
                            src={product.imageUrl || '/placeholder.png'}
                            alt={product.name}
                            width={75}
                            height={75}
                            className="w-24 h-24 object-cover rounded-md"
                        />
                    </div>
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h2 className="text-xl font-bold mb-1 line-clamp-2.5">
                                {product.name.length > 150 ? `${product.name.slice(0, 150)}...` : product.name}
                            </h2>
                            <h2 className="text-xl font-bold mb-1">
                                {product.brand.length > 25 ? `${product.brand.slice(0, 25)}...` : product.brand}
                            </h2>
                        </div>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {product.type}
                        </span>
                    </div>

                    <p className="text-gray-600 min-h-12 max-h-24 overflow-hidden text-sm mb-4 line-clamp-1">
                        {product.description}
                    </p>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                    <StarIcon
                                        key={i}
                                        className={`h-5 w-5 ${i < 4
                                            ? 'text-yellow-400'
                                            : 'text-gray-200'
                                            }`}
                                    />
                                ))}
                            </div>
                            <span className="ml-2 text-sm text-gray-600">
                                rating
                            </span>
                        </div>
                        <span className="text-sm text-gray-500">
                            # reviews
                        </span>
                    </div>  

                    <div className="mt-4 flex justify-between items-center">
                        <span className="text-lg font-semibold text-blue-600">
                            ${product.price?.toString()}
                        </span>
                        <span className="text-sm text-blue-600">
                            View Details →
                        </span>
                    </div>
                </div>
            </Link>
        </div>
    )
}