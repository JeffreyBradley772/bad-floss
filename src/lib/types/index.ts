// Common types used across the application
export type ActionResult<T = any> = {
  success: boolean;
  data?: T;
  error?: string;
  fieldErrors?: Record<string, string[]>;
};

// Form state for client components
export type FormState<T = any> = {
  isSubmitting: boolean;
  errors?: Record<string, string[]>;
  data?: T;
};

// Serialized versions of Prisma models for client components
export type SerializedFlossProduct = {
  id: string;
  name: string;
  brand: string;
  shortDescription: string | null;
  longDescription: string | null;
  price: number | null; // Decimal converted to number
  msrp: number | null; // Decimal converted to number
  thumbnailImageUrl: string | null;
  mediumImageUrl: string | null;
  largeImageUrl: string | null;
  walmartRating: number | null; // Decimal converted to number
  affiliateUrl: string | null;
  createdAt: string; // Date converted to ISO string
  updatedAt: string; // Date converted to ISO string
};

export type SerializedFlossReview = {
  id: string;
  title: string;
  productId: string;
  description: string;
  rating: number;
  userId: string;
  createdAt: string; // Date converted to ISO string
  updatedAt: string; // Date converted to ISO string
  user?: {
    name: string | null;
    image: string | null;
  };
  product?: SerializedFlossProduct;
  _count?: {
    comments: number;
  };
};
