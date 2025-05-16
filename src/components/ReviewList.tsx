"use client"
import { useRef, useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import FadeInWrapper from './ui/FadeInWrapper';

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

type ReviewListProps = {
  initialProducts: SerializedProduct[];
  page: number;
};

export default function ReviewList({ initialProducts, page }: ReviewListProps) {
  const [products, setProducts] = useState(initialProducts);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const [skipProducts, setSkipProducts] = useState(initialProducts.length);
  const [hasMoreProducts, setHasMoreProducts] = useState(true);

  const loadMorePointRef = useRef<HTMLDivElement>(null);

  const loadMoreProducts = async () => {
    if (isLoadingProducts || !hasMoreProducts) return;

    setIsLoadingProducts(true);
    try {
      const response = await fetch(`/api/products/?skipProducts=${skipProducts}&takeProducts=10`);
      const data = await response.json();
      if (Array.isArray(data.products) && data.products.length > 0 && data.products.length < 40) {
        setProducts((prev) => [...prev, ...data.products]);
        setSkipProducts((prev) => prev + data.products.length);
        setHasMoreProducts(data.pagination.hasMoreProducts);
      } else {
        setHasMoreProducts(false);
      }

    } catch (error) {
      console.error("Error loading more products:", error);
    } finally {
      setIsLoadingProducts(false);
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !isLoadingProducts && hasMoreProducts) {
        loadMoreProducts();
      }
    }, {
      threshold: 0.5,
    });

    if (loadMorePointRef.current) {
      observer.observe(loadMorePointRef.current);
    }

    return () => {
      observer.disconnect();
    }

  }, [hasMoreProducts, isLoadingProducts, skipProducts])


  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <FadeInWrapper key={product.id}>
            <ProductCard product={product} />
        </FadeInWrapper>
      ))}
      {hasMoreProducts && products.length < 25 && (
        <div ref={loadMorePointRef} className="col-span-full h-20 flex items-center justify-center">
          {isLoadingProducts ? 'Loading more products...' : ''}
        </div>
      )}
      {products.length > 25 && (
        <div className="col-span-full h-20 flex items-center justify-center">
          <button onClick={loadMoreProducts} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
            Load More Products
          </button>
        </div>
      )}
    </div>
  );
}
