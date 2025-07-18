import { Router } from "express";
import ProductController from "../controllers/Product.controller";
import authMiddleware from "middlewares/Auth";
import { imageUploadMiddleware } from "middlewares/Upload";
import { container } from "tsyringe";

    const router= Router();
    const productController = container.resolve(ProductController)
router.post("/", authMiddleware,imageUploadMiddleware("product"), productController.CreateProduct);
router.get("/", authMiddleware, productController.GetAllProducts);  
router.get("/:id", authMiddleware, productController.GetOneProduct);
router.delete("/:id", authMiddleware, productController.DeleteProduct);
router.put("/:id", authMiddleware ,imageUploadMiddleware("product"), productController.UpdateProduct)
    ;
    module.exports = router;