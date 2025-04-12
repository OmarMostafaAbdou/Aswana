import { Document, Model, SortOrder } from "mongoose";

interface PaginationMeta {
  totalItems: number;
  currentPage: number;
  totalPages: number;
}

interface PaginationResult<T> {
  data: T[];
  meta: PaginationMeta;
}

export async function paginate<T extends Document>(
  model: Model<T>,
  page: number = 1,
  limit: number = 10,
  sort: Record<string, SortOrder> = { createdAt: -1 } 
): Promise<PaginationResult<T>> {
  const skip = (page - 1) * limit;

  const [data, totalItems] = await Promise.all([
    model.find().sort(sort).skip(skip).limit(limit),
    model.countDocuments(),
  ]);

  return {
    data,
    meta: {
      totalItems,
      currentPage: page,
      totalPages: Math.ceil(totalItems / limit),
    },
  };
}
