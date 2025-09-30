'use server';
import {
  getAllProducts,
  getProductById,
  getProductPagination,
  getProducts,
  SerializedProduct,
} from '@/lib/models/products';
import { ActionResult } from '@/lib/types';

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

export async function getAllProductsAction(): Promise<ActionResult<{ products: SerializedProduct[] }>> {
  const { products } = await getAllProducts();
  return { success: true, data: { products } };
}

export async function getProductByIdAction(
  id: string
): Promise<ActionResult<{ product: SerializedProduct | null }>> {
  if (!id) {
    return { success: false, error: 'Missing product ID' };
  }

  const { product } = await getProductById(id);
  return { success: true, data: { product } };
}
