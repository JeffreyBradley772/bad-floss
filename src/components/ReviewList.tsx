import ProductCard from './ProductCard';
import SearchBar from './search/SearchBar';
import FadeInWrapper from './ui/FadeInWrapper';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationEllipsis,
  PaginationNext,
  PaginationPrevious,
} from './ui/pagination';
import { getProductsAction } from '@/app/actions/products';

interface ReviewListProps {
  pageNumber?: number;
}

export default async function ReviewList({ pageNumber = 1 }: ReviewListProps) {
  const { products, pageCount } = await getProductsAction(pageNumber);

  return (
    <div>
      <SearchBar />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(product => (
          <FadeInWrapper key={product.id}>
            <ProductCard product={product} />
          </FadeInWrapper>
        ))}
      </div>
      <div className="flex justify-center mt-6">
        <Pagination>
          <PaginationContent>
            {pageNumber > 1 && (
              <PaginationItem>
                <PaginationPrevious href={`?page=${pageNumber - 1}`} />
              </PaginationItem>
            )}

            {Array.from({ length: Math.min(5, pageCount) }, (_, i) => {
              // Show first page, last page, current page, and pages around current
              let pageNum;
              if (pageCount <= 5) {
                // If 5 or fewer pages, show all
                pageNum = i + 1;
              } else if (pageNumber <= 3) {
                // Near start
                pageNum = i + 1;
              } else if (pageNumber >= pageCount - 2) {
                // Near end
                pageNum = pageCount - 4 + i;
              } else {
                // Middle
                pageNum = pageNumber - 2 + i;
              }

              return (
                <PaginationItem key={pageNum}>
                  <PaginationLink href={`?page=${pageNum}`} isActive={pageNum === pageNumber}>
                    {pageNum}
                  </PaginationLink>
                </PaginationItem>
              );
            })}

            {pageCount > 5 && pageNumber < pageCount - 2 && (
              <>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href={`?page=${pageCount}`}>{pageCount}</PaginationLink>
                </PaginationItem>
              </>
            )}

            {pageNumber < pageCount && (
              <PaginationItem>
                <PaginationNext href={`?page=${pageNumber + 1}`} />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
