import asyncRouterWrapper from "helpers/asyncWrapper";
import ProductService from "../services/product.services";
import { Request, Response } from "express";
import { ToJSONLangOptions } from "types/Category";

import { injectable, inject } from 'tsyringe';
@injectable()

class ProductController{
constructor(@inject(ProductService) private ProductService: ProductService) {}



    CreateProduct = asyncRouterWrapper(async (req: Request, res: Response): Promise<void> => {
        const lang = res.locals.lang || "en";
        const body = req.body;
    
        const product = await this.ProductService.createProduct(lang,body);
    
        res.status(201).json({
        product: product,
        message: "Product created successfully",
        });
    });

    GetAllProducts = asyncRouterWrapper(async (req: Request, res: Response): Promise<void> => {
        const page = req.query.page ? Number(req.query.page) : undefined;
        const limit = req.query.limit ? Number(req.query.limit) : undefined;
        const lang = res.locals.lang || "en"; 
    
        const allProducts = await this.ProductService.getAllProducts(lang, page, limit);
    
        res.status(200).json({
        success: true,
        message: "Products retrieved successfully",
        data: allProducts,
        });
    });
    GetOneProduct = asyncRouterWrapper(async (req: Request, res: Response): Promise<void> => {
        const lang = res.locals.lang || "en"; 
        const Id = req.params.id;
        const product = await this.ProductService.getProductById(Id, lang);
    
        res.status(200).json({
        success: true,
        message: "Product retrieved successfully",
        data: product,
        });
    });
    DeleteProduct = asyncRouterWrapper(async (req: Request, res: Response): Promise<void> => {
        const Id = req.params.id;
        const lang = res.locals.lang || "en"; 
        const product = await this.ProductService.deleteProduct(Id, lang);
    
        res.status(200).json({
        success: true,
        message: "Product deleted successfully",
        data: product,
        });
    });
    UpdateProduct = asyncRouterWrapper(async (req: Request, res: Response): Promise<void> => {
        const Id = req.params.id;
        const lang = res.locals.lang || "en"; 
        const body = req.body;
    
        const product = await this.ProductService.updateProduct(Id, body, lang);
    
        res.status(200).json({
        success: true,
        message: "Product updated successfully",
        data: product ,
        });
    });
}

export default ProductController;