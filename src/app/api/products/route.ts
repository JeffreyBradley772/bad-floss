'use server';

import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { SerializedProduct } from '@/lib/models/products';
import { serialize } from '@/lib/serialization';

type ProductsResponse =
  | {
      products: SerializedProduct[];
      pagination: {
        total: number;
        hasMoreProducts: boolean;
      };
    }
  | { error: string };

// /api/products/route.ts
export async function GET(request: Request): Promise<NextResponse<ProductsResponse>> {
  try {
    // Get query parameters from URL
    const { searchParams } = new URL(request.url);
    const skipProducts = parseInt(searchParams.get('skipProducts') || '0');
    const takeProducts = parseInt(searchParams.get('takeProducts') || '10');

    // Fetch products from database
    const rawProducts = await prisma.flossProduct.findMany({
      take: takeProducts,
      skip: skipProducts,
      orderBy: { createdAt: 'desc' },
    });

    // Serialize products to handle Decimal and Date objects
    const products = serialize(rawProducts);

    const total = await prisma.flossProduct.count();
    const hasMoreProducts = total > skipProducts + takeProducts;

    return NextResponse.json({ products, pagination: { total, hasMoreProducts } });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch products' + error }, { status: 500 });
  }
}
