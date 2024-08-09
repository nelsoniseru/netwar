import { Router } from 'express';
import ProductController from './product.controller';
import {auth} from '../../../middleware/middleware';

const router = Router();

router.post('/products',auth, ProductController.createProduct);
router.get('/products/:id', auth, ProductController.getProduct);
router.put('/products/:id', auth, ProductController.updateProduct);
router.delete('/products/:id', auth, ProductController.deleteProduct);
router.get('/products', auth, ProductController.getAllProducts);
export default router;