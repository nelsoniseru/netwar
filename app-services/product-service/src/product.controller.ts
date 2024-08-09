import { Request, Response } from 'express';
import ProductService from './product.service';
import redisClient from '../../../utils/redis';

class ProductController {
    async createProduct(req: Request, res: Response): Promise<void> {
        try {
            const product = await ProductService.createProduct(req.body);
            res.status(201).json(product);
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            }    
            }
    }

        async getProduct(req: Request, res: Response): Promise<void> {
            const productId = req.params.id;
            redisClient.get(productId, async (err, cachedProduct) => {
                if (err) {
                    // Handle Redis error
                    console.error('Redis error: ', err);
                    return res.status(500).json({ error: 'Internal server error' });
                }
    
                if (cachedProduct) return res.status(200).json(JSON.parse(cachedProduct));
                    try {
                        const product = await ProductService.getProductById(productId);
                        if (!product) return res.status(404).json({ message: 'Product not found' });
                            redisClient.setex(productId, 3600, JSON.stringify(product));
                            return res.status(200).json(product);
                        
                    } catch (error) {
                        // Handle unexpected errors
                        if (error instanceof Error) {
                            res.status(400).json({ error: error.message });
                        } else {
                            res.status(500).json({ error: 'Internal server error' });
                        }
                    }
                
            });
        }
    

    async updateProduct(req: Request, res: Response){
        try {
            const product = await ProductService.updateProduct(req.params.id, req.body);
            if (!product) return res.status(404).json({ message: 'Product not found' });
            return res.status(200).json(product);
            
        } catch (error) {
            // Handle unexpected errors
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            } 
        }
    }

    async deleteProduct(req: Request, res: Response){
        try {
            const product = await ProductService.deleteProduct(req.params.id);
            if (!product) return res.status(404).json({ message: 'Product not found' });
               return res.status(200).json({ message: 'Product deleted' });
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            }       
         }
    }

    async getAllProducts(req: Request, res: Response){
        try {
            const products = await ProductService.getAllProducts();
            return res.status(200).json(products);
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            }
        }
    }
}

export default new ProductController();
