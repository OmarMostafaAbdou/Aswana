// Category DTOs for request/response validation
export interface CreateCategoryDto {
  en_category_name: string;
  ar_category_name: string;
  en_description: string;
  ar_description: string;
  image: string;
}

export interface UpdateCategoryDto extends Partial<CreateCategoryDto> {
  id: string;
}

export interface CategoryQueryDto {
  page?: number;
  limit?: number;
  lang?: "en" | "ar";
}

export interface CategoryParamsDto {
  id: string;
}

// Response DTOs
export interface CategoryResponseDto {
  id: string;
  name: string;
  description: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CategoryListResponseDto {
  categories: CategoryResponseDto[];
  meta?: {
    totalItems: number;
    currentPage: number;
    totalPages: number;
    
  };
}

// Validation schemas (for Joi or similar)
export const createCategorySchema = {
  en_category_name: { type: 'string', required: true, min: 2, max: 100 },
  ar_category_name: { type: 'string', required: true, min: 2, max: 100 },
  en_description: { type: 'string', required: true, min: 10, max: 500 },
  ar_description: { type: 'string', required: true, min: 10, max: 500 },
  image: { type: 'string', required: true }
};

export const updateCategorySchema = {
  id: { type: 'string', required: true },
  en_category_name: { type: 'string', optional: true, min: 2, max: 100 },
  ar_category_name: { type: 'string', optional: true, min: 2, max: 100 },
  en_description: { type: 'string', optional: true, min: 10, max: 500 },
  ar_description: { type: 'string', optional: true, min: 10, max: 500 },
  image: { type: 'string', optional: true }
}; 