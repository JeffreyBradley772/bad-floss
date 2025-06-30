'use server';
import { prisma } from "@/lib/prisma";
import { SerializedProduct } from "@/types";

export async function getProducts(page: number) : Promise<{ products: SerializedProduct[]}> {

  const products = await prisma.flossProduct.findMany({
    take: 24,
    skip: (page - 1) * 24,
    orderBy: { createdAt: "desc" }
  })
  const serializedProducts = products.map(product => ({
    ...product,
    price: product.price ? parseFloat(product.price.toString()) : null,
    createdAt: product.createdAt.toISOString(),
    updatedAt: product.updatedAt.toISOString()
  }));

  return { products: serializedProducts };
}

export async function getProductPagination() : Promise<{ pageCount: number }> {

  const total = await prisma.flossProduct.count();
  const pageCount = Math.ceil(total / 24);

  return { pageCount };
}