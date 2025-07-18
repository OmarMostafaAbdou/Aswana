// User DTOs for request/response validation
export interface CreateUserDto {
  first_name: string;
  last_name: string;
  ar_first_name: string;
  ar_last_name: string;
  username: string;
  phone: string;
  email: string;
  password: string;
  role: "seller" | "buyer" | "admin";
  image?: string;
}

export interface UpdateUserDto extends Partial<CreateUserDto> {
  id: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface UserQueryDto {
  page?: number;
  limit?: number;
  role?: "seller" | "buyer" | "admin";
  lang?: "en" | "ar";
}

export interface UserParamsDto {
  id: string;
}

// Response DTOs
export interface UserResponseDto {
  id: string;
  first_name: string;
  last_name: string;
  username: string;
  phone: string;
  email: string;
  role: string;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthResponseDto {
  user: UserResponseDto;
  token: string;
}

export interface UserListResponseDto {
  users: UserResponseDto[];
  meta?: {
    totalItems: number;
    currentPage: number;
    totalPages: number;
  };
}

// Validation schemas
export const createUserSchema = {
  first_name: { type: 'string', required: true, min: 2, max: 50 },
  last_name: { type: 'string', required: true, min: 2, max: 50 },
  ar_first_name: { type: 'string', required: true, min: 2, max: 50 },
  ar_last_name: { type: 'string', required: true, min: 2, max: 50 },
  username: { type: 'string', required: true, min: 3, max: 30 },
  phone: { type: 'string', required: true, pattern: /^[0-9+\-\s()]+$/ },
  email: { type: 'string', required: true, format: 'email' },
  password: { type: 'string', required: true, min: 6 },
  role: { type: 'string', required: true, enum: ['seller', 'buyer', 'admin'] },
  image: { type: 'string', optional: true }
};

export const loginSchema = {
  email: { type: 'string', required: true, format: 'email' },
  password: { type: 'string', required: true }
}; 