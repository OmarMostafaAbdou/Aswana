import { injectable } from "tsyringe";
import { IProduct,ProductModel } from "../model/product.model";


interface IProductRepository {
    createProduct(data: Partial<IProduct>): Promise<IProduct>;
    getAllProducts(): Promise<IProduct[]>;
    getProductById(id: string): Promise<IProduct | null>;
    updateProduct(id: string, data: Partial<IProduct>): Promise<IProduct | null>;
    deleteProduct(id: string): Promise<IProduct | null>;
}

@injectable()
class ProductRepository implements IProductRepository {
    async createProduct(data: Partial<IProduct>): Promise<IProduct> {
        return ProductModel.create(data);
    }
    async getAllProducts(): Promise<IProduct[]> {
        return ProductModel.find();
    }
    async getProductById(id: string): Promise<IProduct | null> {
        return ProductModel.findById(id);
    }
    async updateProduct(id: string, data: Partial<IProduct>): Promise<IProduct | null> {
        return ProductModel.findByIdAndUpdate(id, data, { new: true });
    }
    async deleteProduct(id: string): Promise<IProduct | null> {
        return ProductModel.findByIdAndDelete(id);
    }
}
export { ProductRepository, IProductRepository };

