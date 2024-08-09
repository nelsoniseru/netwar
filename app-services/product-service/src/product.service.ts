

import Product, { IProduct } from './product.models';

class ProductService {
    async createProduct(productData: IProduct): Promise<IProduct> {
        const product = new Product(productData);
        await product.save();
        return product;
    }

    async getProductById(id: string): Promise<IProduct | null> {
        return Product.findById(id);
    }

    async updateProduct(id: string, productData: Partial<IProduct>): Promise<IProduct | null> {
        return Product.findByIdAndUpdate(id, productData, { new: true });
    }

    async deleteProduct(id: string): Promise<IProduct | null> {
        return Product.findByIdAndDelete(id);
    }

    async getAllProducts(): Promise<IProduct[]> {
        return Product.find();
    }
}

export default new ProductService();
