// services/Category.services.ts
import { injectable, inject } from 'tsyringe';
import CategoryModel, { ICategory } from "../models/Category.model";
import { ToJSONLangOptions } from "types/Category";
import { paginate } from "utils/pagination";
import { Types } from "mongoose";
import CustomError from "helpers/Errors";
import { CategoryRepository } from "../Repository/Category.repository";
import { 
  CreateCategoryDto, 
  UpdateCategoryDto, 
  CategoryResponseDto, 
  CategoryListResponseDto,
  PaginationMetaDto 
} from "types/dto";

@injectable()
class CategoryServices {
  constructor(@inject(CategoryRepository) private repo: CategoryRepository) {}

  async createCategory(lang: "en" | "ar", data: CreateCategoryDto): Promise<CategoryResponseDto> {
    const name = {
      en: data.en_category_name,
      ar: data.ar_category_name,
    };
    const description = {
      en: data.en_description,
      ar: data.ar_description,
    };

    const category = await this.repo.createCategory({ name, description, image: data.image });
    
    return this.mapToResponseDto(category, lang);
  }

  async getAllCategories(lang: "en" | "ar", page?: number, limit?: number): Promise<CategoryListResponseDto> {
    const options: ToJSONLangOptions = {
      lang,
      flattenMaps: false,
      flattenObjectIds: true,
    };

    let categories: ICategory[];
    let meta: PaginationMetaDto | undefined;

    if (!page || !limit) {
      categories = await this.repo.getAllCategories();
    } else {
      const paginatedResult = await paginate<ICategory>(CategoryModel, page, limit);
      categories = paginatedResult.data;
      meta = {
        totalItems: paginatedResult.meta.totalItems,
        currentPage: paginatedResult.meta.currentPage,
        totalPages: paginatedResult.meta.totalPages,
        hasNextPage: paginatedResult.meta.currentPage < paginatedResult.meta.totalPages,
        hasPrevPage: paginatedResult.meta.currentPage > 1
      };
    }

    if (!categories.length) {
      throw new CustomError("No categories found. Create a new one.", 400);
    }

    const categoryDtos = categories.map((cat) => this.mapToResponseDto(cat, lang));

    return {
      categories: categoryDtos,
      meta
    };
  }

  async getCategoryById(id: string, lang: "en" | "ar"): Promise<CategoryResponseDto> {
    if (!Types.ObjectId.isValid(id)) {
      throw new CustomError("Invalid category ID format", 400);
    }

    const category = await this.repo.getCategoryById(id);
    if (!category) throw new CustomError("This category is not found", 400);

    return this.mapToResponseDto(category, lang);
  }

  async updateCategory(id: string, data: UpdateCategoryDto, lang: "en" | "ar"): Promise<CategoryResponseDto> {
    if (!Types.ObjectId.isValid(id)) {
      throw new CustomError("Invalid category ID format", 400);
    }

    const updateData: Partial<ICategory> = {};
    
    if (data.en_category_name || data.ar_category_name) {
      updateData.name = {
        en: data.en_category_name || "",
        ar: data.ar_category_name || "",
      };
    }
    
    if (data.en_description || data.ar_description) {
      updateData.description = {
        en: data.en_description || "",
        ar: data.ar_description || "",
      };
    }
    
    if (data.image) {
      updateData.image = data.image;
    }

    const updated = await this.repo.updateCategory(id, updateData);
    if (!updated) throw new CustomError("Category not found or update failed", 400);

    return this.mapToResponseDto(updated, lang);
  }

  async deleteCategory(id: string, lang: "en" | "ar"): Promise<CategoryResponseDto> {
    if (!Types.ObjectId.isValid(id)) {
      throw new CustomError("Invalid category ID format", 400);
    }

    const deleted = await this.repo.deleteCategory(id);
    if (!deleted) throw new CustomError("Category not found or delete failed", 400);

    return this.mapToResponseDto(deleted, lang);
  }

  private mapToResponseDto(category: ICategory, lang: "en" | "ar"): CategoryResponseDto {
    const options: ToJSONLangOptions = {
      lang,
      flattenMaps: false,
      flattenObjectIds: true,
    };

    const categoryJson = category.toJSON(options);
    
    return {
      id: categoryJson._id || categoryJson.id,
      name: categoryJson.name,
      description: categoryJson.description,
      image: categoryJson.image,
      createdAt: categoryJson.createdAt,
      updatedAt: categoryJson.updatedAt
    };
  }
}

export default CategoryServices;