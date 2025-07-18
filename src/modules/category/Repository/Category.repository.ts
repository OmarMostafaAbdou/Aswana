import { injectable } from 'tsyringe';
import CategoryModel, { ICategory } from "../models/Category.model";

interface ICategoryRepository {
  createCategory(data: Partial<ICategory>): Promise<ICategory>;
  getAllCategories(): Promise<ICategory[]>;
  getCategoryById(id: string): Promise<ICategory | null>;
  updateCategory(id: string, data: Partial<ICategory>): Promise<ICategory | null>;
  deleteCategory(id: string): Promise<ICategory | null>;
}

@injectable()
class CategoryRepository implements ICategoryRepository {
  async createCategory(data: Partial<ICategory>): Promise<ICategory> {
    return CategoryModel.create(data);
  }

  async getAllCategories(): Promise<ICategory[]> {
    return CategoryModel.find();
  }

  async getCategoryById(id: string): Promise<ICategory | null> {
    return CategoryModel.findById(id);
  }

  async updateCategory(id: string, data: Partial<ICategory>): Promise<ICategory | null> {
    return CategoryModel.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteCategory(id: string): Promise<ICategory | null> {
    return CategoryModel.findByIdAndDelete(id);
  }
}

export { CategoryRepository, ICategoryRepository };
