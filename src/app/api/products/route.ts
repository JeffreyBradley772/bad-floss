"use server";

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { FlossProduct } from "@prisma/client";

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

type ProductsResponse = { 
    products: SerializedProduct[], 
    pagination: {
        total: number,
        hasMoreProducts: boolean
    }
} | { error: string };

// /api/products/route.ts
export async function GET(request: Request): Promise<NextResponse<ProductsResponse>> {
    try {
        // Get query parameters from URL
        const { searchParams } = new URL(request.url);
        const skipProducts = parseInt(searchParams.get('skipProducts') || "0");
        const takeProducts = parseInt(searchParams.get('takeProducts') || "10");
        
        // Fetch products from database
        const rawProducts = await prisma.flossProduct.findMany({
            take: takeProducts, 
            skip: skipProducts, 
            orderBy: { createdAt: "desc" }
        });

        // Serialize products to handle Decimal and Date objects
        const products = rawProducts.map(product => ({
            ...product,
            price: product.price ? parseFloat(product.price.toString()) : null,
            createdAt: product.createdAt.toISOString(),
            updatedAt: product.updatedAt.toISOString()
        }));

        const total = await prisma.flossProduct.count();
        const hasMoreProducts = total > skipProducts + takeProducts;

        return NextResponse.json({ products, pagination: { total, hasMoreProducts } });
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
    }
}