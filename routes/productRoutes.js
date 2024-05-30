import express from 'express';
import { createProduct, getProducts } from '../controllers/PostController.js';

const router = express.Router();

router.post('/products', createProduct);
router.get('/products', getProducts);

export default router;
