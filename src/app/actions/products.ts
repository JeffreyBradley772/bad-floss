'use server';
import {
  getAllProducts,
  getProductById,
  getProductPagination,
  getProducts,
  SerializedProduct,
} from '@/lib/models/products';

export async function getProductsAction(
  page: number
): Promise<{ products: SerializedProduct[]; pageCount: number }> {
  const { products } = await getProducts(page);
  const { pageCount } = await getProductPagination();

  return {
    products,
    pageCount,
  };
}

export async function getAllProductsAction(): Promise<{ products: SerializedProduct[] }> {
  const { products } = await getAllProducts();
  return { products };
}

export async function getProductByIdAction(
  id: string
): Promise<{ product: SerializedProduct | null, error?: string | null}> {

  if (!id) {
    return { product: null, error: 'Missing product ID' };
  }

  const { product } = await getProductById(id);
  return { product, error: null };
}
