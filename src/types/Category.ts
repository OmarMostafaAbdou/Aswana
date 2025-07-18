import { ICategory } from "modules/category/models/Category.model";
import { categoryData } from "./user";

import { ToObjectOptions } from "mongoose";

export interface ICategoryRepository {
  createCategory(data: categoryData): Promise<ICategory>;
  getAllCategories(page?: number, limit?: number, lang?: string): Promise<ICategory[]>;
  getCategoryById(id: string, lang?: string): Promise<ICategory>;
  updateCategory(id: string, data: categoryData, lang?: string): Promise<ICategory>;
  deleteCategory(id: string, lang?: string): Promise<ICategory>;
}

export interface ToJSONLangOptions extends ToObjectOptions {
  lang?: "en" | "ar";
  flattenMaps: false;
  flattenObjectIds: true;
}