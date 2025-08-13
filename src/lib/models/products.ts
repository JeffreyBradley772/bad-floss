'use server';
import { prisma } from '@/lib/prisma';
import { FlossProduct } from '@prisma/client';
import { serialize, Serialized } from '@/lib/serialization';

export type SerializedProduct = Serialized<FlossProduct>;

export async function getProducts(page: number): Promise<{ products: SerializedProduct[] }> {
  const products = await prisma.flossProduct.findMany({
    take: 24,
    skip: (page - 1) * 24,
    orderBy: { createdAt: 'desc' },
  });
  return { products: serialize(products) };
}

export async function getProductPagination(): Promise<{ pageCount: number }> {
  const total = await prisma.flossProduct.count();
  const pageCount = Math.ceil(total / 24);
  return { pageCount };
}

export async function getAllProducts(): Promise<{ products: SerializedProduct[] }> {
  const products = await prisma.flossProduct.findMany({
    orderBy: { createdAt: 'desc' },
  });
  return { products: serialize(products) };
}

export async function getProductById(
  productId: string
): Promise<{ product: SerializedProduct | null }> {
  const product = await prisma.flossProduct.findUnique({
    where: {
      id: productId,
    }
  });

  if (!product) {
    return { product: null };
  }

  return {
    product: serialize(product),
  };
}
