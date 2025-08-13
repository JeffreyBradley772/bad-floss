import ProductDetails from '@/components/ProductDetails';
import ProductDetailsSkeleton from '@/components/skeletons/ProductDetailsSkeleton';
import { Suspense } from 'react';

export default function FlossDetailPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <Suspense fallback={<ProductDetailsSkeleton />}>
        <ProductDetails productId={params.id} />
      </Suspense>
    </div>
  );
}
