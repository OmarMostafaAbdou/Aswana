// Common DTOs for shared functionality
export interface PaginationDto {
  page?: number;
  limit?: number;
}

export interface PaginationMetaDto {
  totalItems: number;
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  
}

export interface ApiResponseDto<T> {
  success: boolean;
  message: string;
  data?: T;
  meta?: PaginationMetaDto;
  errors?: string[];
}

export interface ErrorResponseDto {
  success: false;
  message: string;
  errors?: string[];
  statusCode: number;
}

export interface SuccessResponseDto<T> {
  success: true;
  message: string;
  data: T;
  meta?: PaginationMetaDto;
}

// Language-specific DTOs
export interface LocalizedTextDto {
  en: string;
  ar: string;
}

export interface LocalizedContentDto {
  title: LocalizedTextDto;
  description: LocalizedTextDto;
}

// File upload DTOs
export interface FileUploadDto {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  destination: string;
  filename: string;
  path: string;
}

export interface UploadResponseDto {
  filename: string;
  path: string;
  url: string;
  size: number;
  mimetype: string;
}

// Search and filter DTOs
export interface SearchDto {
  query: string;
  fields?: string[];
  lang?: "en" | "ar";
}

export interface FilterDto {
  [key: string]: any;
}

export interface SortDto {
  field: string;
  order: "asc" | "desc";
}

// Request context DTOs
export interface AuthenticatedRequestDto {
  userId: string;
  userRole: string;
  userEmail: string;
}

export interface RequestContextDto {
  lang: "en" | "ar";
  timezone?: string;
  ip?: string;
  userAgent?: string;
} 