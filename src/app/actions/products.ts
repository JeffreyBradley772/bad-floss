'use server';
import { getProducts } from "@/lib/models/products";
import { SerializedProduct } from "@/types";

export async function getProductsAction(page: number): Promise<{ products: SerializedProduct[] }> {
    return await getProducts(page);
}