import { Router } from "express";
import authMiddleware from "../../../middlewares/Auth";
import CategoryController from "../controllers/Category.controller";
import { imageUploadMiddleware } from "middlewares/Upload";
import { container } from "tsyringe";

const router = Router();
const categoryController = container.resolve(CategoryController);

router.post("/", authMiddleware,imageUploadMiddleware("categories"), categoryController.CreateCategory);
router.get("/", authMiddleware, categoryController.GetAllCategories);
router.get("/:id", authMiddleware, categoryController.GetOneCategory);
router.delete("/:id", authMiddleware, categoryController.DeleteCategory);
router.put("/:id", authMiddleware ,imageUploadMiddleware("categories"), categoryController.UpdateCategory);

module.exports = router;
