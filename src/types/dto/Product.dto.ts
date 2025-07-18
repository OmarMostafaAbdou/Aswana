import { ObjectId } from "mongoose";

// Product DTOs for request/response validation
export interface CreateProductDto {
  ar_product_name: string;
  en_product_name: string;
  ar_description: string;
  en_description: string;
  image: string;
  categoryId: string;
  price: number;
  isAuction: boolean;
  gallery: string[];
  sellerId: string;
}

export interface UpdateProductDto {
  ar_product_name: string;
  en_product_name: string;
  ar_description: string;
  en_description: string;
  image: string;
  categoryId: string;
  price: number;    
  isAuction: boolean;
  gallery: string[];
}

export interface ProductQueryDto {
  page?: number;
  limit?: number;
  categoryId?: string;
  sellerId?: string;
  isAuction?: boolean;
  minPrice?: number;
  maxPrice?: number;

  lang?: "en" | "ar";
}

export interface ProductParamsDto {
  id: string;
}

// Response DTOs
export interface ProductResponseDto {
  id: string;
  title: string;
  description: string;
  image: string;
  categoryId: string;
  categoryName?: string;
  price: number;
  isAuction: boolean;
  sellerId: string;
  sellerName?: string;

  gallery: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductListResponseDto {
  products: ProductResponseDto[];
  meta?: {
    totalItems: number;
    currentPage: number;
    totalPages: number;
  };
}

// Validation schemas
export const createProductSchema = {
  ar_product_name: { type: 'string', required: true, min: 2, max: 100 },
  en_product_name: { type: 'string', required: true, min: 2, max: 100 },
  ar_description: { type: 'string', required: true, min: 10, max: 1000 },
  en_description: { type: 'string', required: true, min: 10, max: 1000 },
  image: { type: 'string', required: true },
  categoryId: { type: 'string', required: true },
  price: { type: 'number', required: true, min: 0 },
  isAuction: { type: 'boolean', required: true },
  gallery: { type: 'array', items: { type: 'string' }, optional: true },
  sellerId: { type: 'string', required: true }
};

export const updateProductSchema = {
  id: { type: 'string', required: true },
  ar_product_name: { type: 'string', optional: true, min: 2, max: 100 },
  en_product_name: { type: 'string', optional: true, min: 2, max: 100 },
  ar_description: { type: 'string', optional: true, min: 10, max: 1000 },
  en_description: { type: 'string', optional: true, min: 10, max: 1000 },
  image: { type: 'string', optional: true },
  categoryId: { type: 'string', optional: true },
  price: { type: 'number', optional: true, min: 0 },
  isAuction: { type: 'boolean', optional: true },
  gallery: { type: 'array', items: { type: 'string' }, optional: true }
}; 