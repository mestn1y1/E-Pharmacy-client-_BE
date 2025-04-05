import express from 'express';
import {
  getProductsController,
  getProductByIdController,
} from '../controllers/products.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = express.Router();

router.get('/products', ctrlWrapper(getProductsController));
router.get('/products/:id', ctrlWrapper(getProductByIdController));

export default router;
