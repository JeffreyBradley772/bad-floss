import ProductDetails from '@/components/ProductDetails';
import ProductDetailsSkeleton from '@/components/skeletons/ProductDetailsSkeleton';
import { Suspense } from 'react';

export default async function FlossDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <div>
      <Suspense fallback={<ProductDetailsSkeleton />}>
        <ProductDetails productId={id} />
      </Suspense>
    </div>
  );
}
