import { IProduct,ProductModel } from "../model/product.model";
import { paginate } from "utils/pagination";
import { Types } from "mongoose";
import { ToJSONLangOptions } from "types/Category";

import CustomError from "helpers/Errors";
import { injectable,inject } from "tsyringe";

    import { ProductRepository } from "../Repository/product.repository";
    import {
      CreateProductDto,
      UpdateProductDto,
      ProductResponseDto,
      ProductListResponseDto,
      PaginationMetaDto,
    } from "types/dto";

@injectable()


class ProductService {

  constructor(@inject(ProductRepository) private repo: ProductRepository) {}
  private mapToResponseDto(product: IProduct, lang: "en" | "ar"): ProductResponseDto {
    const options: ToJSONLangOptions = {
      lang,
      flattenMaps: false,
      flattenObjectIds: true,
    };

    const productJson = product.toJSON(options);
    
    return {
      id: productJson._id.toString(),
      title: productJson.title,
      description: productJson.description,
      image: productJson.image,
      categoryId: productJson.categoryId,
      price: productJson.price,
      isAuction: productJson.isAuction,
      sellerId: productJson.sellerId,
      gallery: productJson.gallery,
      createdAt: productJson.createdAt,
      updatedAt: productJson.updatedAt
    };
  }

  async getAllProducts(lang: "en" | "ar", page?: number, limit?: number): Promise<ProductListResponseDto> {
    const options: ToJSONLangOptions = {
      lang,
      flattenMaps: false,
      flattenObjectIds: true,
    };

    let products: IProduct[];
    let meta: PaginationMetaDto | undefined;

    if (!page || !limit) {
      products = await this.repo.getAllProducts();
    } else {
      const paginatedResult = await paginate<IProduct>(ProductModel, page, limit);
      products = paginatedResult.data;
      meta = {
        totalItems: paginatedResult.meta.totalItems,
        currentPage: paginatedResult.meta.currentPage,
        totalPages: paginatedResult.meta.totalPages,
        hasNextPage: paginatedResult.meta.currentPage < paginatedResult.meta.totalPages,
        hasPrevPage: paginatedResult.meta.currentPage > 1
      };
    }

    if (!products.length) {
      throw new CustomError("No products found. Create a new one.", 400);
    }

    const productDtos = products.map((product) => this.mapToResponseDto(product, lang));

    return {
      products: productDtos,
      meta
    };
  }


  async getProductById(id:string,lang:"en" | "ar"): Promise<ProductResponseDto> {
    if (!Types.ObjectId.isValid(id)) {
              throw new CustomError("Invalid category ID format", 400);
          }
      
    const product = await ProductModel.findById(id);
    if (!product) {
      throw new CustomError("Product not found.", 404);
    }

    return this.mapToResponseDto(product, lang);
    
  }

  async createProduct(lang: "en" | "ar", data: CreateProductDto): Promise<ProductResponseDto> {
    const {
      ar_product_name,
      en_product_name,
      ar_description,
      en_description,
      image,
      gallery,
      categoryId,
      price,
      isAuction,  
      
      sellerId
    } = data;

    const title = {
      en: en_product_name,
      ar: ar_product_name,
    };

    const description = {
      en: en_description,
      ar: ar_description,
    };

    const product = await this.repo.createProduct({
      title,
      description,
      image,
      categoryId: new Types.ObjectId(categoryId),
      price,
      isAuction,
      sellerId: new Types.ObjectId(sellerId),
      gallery
    });

    return this.mapToResponseDto(product, lang);

  }

 async updateProduct(id: string, data: UpdateProductDto, lang: "en" | "ar"): Promise<ProductResponseDto> {
    if (!Types.ObjectId.isValid(id)) {
      throw new CustomError("Invalid product ID format", 400);
    }

    const {
      ar_product_name,
      en_product_name,
      ar_description,
      en_description,
      image,
      categoryId,
      price,
      isAuction
      ,
        gallery 
    } = data;

    const title = {
      en: en_product_name,
      ar: ar_product_name,
    };

    const description = {
      en: en_description,
      ar: ar_description,
    };

    const updatedProduct = await this.repo.updateProduct(id, { title, description, image, categoryId: new Types.ObjectId(categoryId) || undefined, price, isAuction, gallery });


    if (!updatedProduct) {
      throw new CustomError("Product not found or update failed", 400);
    }

    return this.mapToResponseDto(updatedProduct, lang);
 
  }

  async deleteProduct(id: string, lang: "en" | "ar"): Promise<ProductResponseDto> {
    if (!Types.ObjectId.isValid(id)) {
      throw new CustomError("Invalid product ID format", 400);
    }

    const deletedProduct = await this.repo.deleteProduct(id);
    if (!deletedProduct) {
      throw new CustomError("Product not found or delete failed", 400);
    }
    return this.mapToResponseDto(deletedProduct, lang);

  }
}
export default  ProductService;