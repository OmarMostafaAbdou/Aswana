import asyncRouterWrapper from "helpers/asyncWrapper";
import { Request, Response } from 'express';
import { injectable, inject } from 'tsyringe';
import CategoryServices from "../services/category.services";
import { ToJSONLangOptions } from "types/Category";

@injectable()
class CategoryController {
  constructor(@inject(CategoryServices) private categoryService: CategoryServices) {}

  CreateCategory = asyncRouterWrapper(async (req: Request, res: Response): Promise<void> => {
    const lang = res.locals.lang || "en";
    const category = await this.categoryService.createCategory(lang,req.body);

    res.status(201).json({
      category: category,
      message: "Category created successfully",
    });
  });

  GetAllCategories = asyncRouterWrapper(async (req: Request, res: Response): Promise<void> => {
    const page = req.query.page ? Number(req.query.page) : undefined;
    const limit = req.query.limit ? Number(req.query.limit) : undefined;
    const lang = res.locals.lang || "en";

    const allCategories = await this.categoryService.getAllCategories(lang, page, limit);

    res.status(200).json({
      success: true,
      message: "Categories retrieved successfully",
      data: allCategories,
    });
  });

  GetOneCategory = asyncRouterWrapper(async (req: Request, res: Response): Promise<void> => {
    const lang = res.locals.lang || "en";
    const id = req.params.id;

    const category = await this.categoryService.getCategoryById(id, lang);

    res.status(200).json({
      success: true,
      message: "Category retrieved successfully",
      data: category,
    });
  });

  DeleteCategory = asyncRouterWrapper(async (req: Request, res: Response): Promise<void> => {
    const lang = res.locals.lang || "en";
    const id = req.params.id;

    const deleted = await this.categoryService.deleteCategory(id, lang);

    res.status(200).json({
      success: true,
      message: "Category deleted successfully",
      data: deleted,
    });
  });

  UpdateCategory = asyncRouterWrapper(async (req: Request, res: Response): Promise<void> => {
    const lang = res.locals.lang || "en";
    const id = req.params.id;

    const updated = await this.categoryService.updateCategory(id, req.body, lang);

    if (typeof updated === 'object' && updated !== null && 'toJSON' in updated) {
      res.status(200).json({
        category: updated,
        message: "Category updated successfully",
      });
    } else {
      res.status(500).json({
        message: "Failed to update category",
      });
    }
  });
}

export default CategoryController;
