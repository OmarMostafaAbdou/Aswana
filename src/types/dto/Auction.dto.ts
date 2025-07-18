// Auction DTOs for request/response validation
export interface CreateAuctionDto {
  productId: string;
  startDate: Date;
  endDate: Date;
  status?: "active" | "completed" | "cancelled";
}

export interface UpdateAuctionDto extends Partial<CreateAuctionDto> {
  id: string;
}

export interface AuctionQueryDto {
  page?: number;
  limit?: number;
  status?: "active" | "completed" | "cancelled";
  productId?: string;
  startDate?: Date;
  endDate?: Date;
}

export interface AuctionParamsDto {
  id: string;
}

export interface BidDto {
  auctionId: string;
  bidderId: string;
  amount: number;
}

// Response DTOs
export interface AuctionResponseDto {
  id: string;
  productId: string;
  productName?: string;
  startDate: Date;
  endDate: Date;
  status: "active" | "completed" | "cancelled";
  currentBid?: number;
  totalBids?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuctionListResponseDto {
  auctions: AuctionResponseDto[];
  meta?: {
    totalItems: number;
    currentPage: number;
    totalPages: number;
  };
}

export interface BidResponseDto {
  id: string;
  auctionId: string;
  bidderId: string;
  bidderName?: string;
  amount: number;
  createdAt: Date;
}

// Validation schemas
export const createAuctionSchema = {
  productId: { type: 'string', required: true },
  startDate: { type: 'date', required: true },
  endDate: { type: 'date', required: true },
  status: { type: 'string', optional: true, enum: ['active', 'completed', 'cancelled'] }
};

export const bidSchema = {
  auctionId: { type: 'string', required: true },
  bidderId: { type: 'string', required: true },
  amount: { type: 'number', required: true, min: 0 }
}; 