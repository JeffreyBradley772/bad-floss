export interface Brand {
  id: string;
  name: string;
  company: string;
  averageRating: number;
  totalReviews: number;
  description: string;
  price: string;
  type: string;
  imageUrl: string | null;
}

// Define a serialized version of FlossProduct
export type SerializedProduct = {
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
