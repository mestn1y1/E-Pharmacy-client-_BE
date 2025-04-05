import express from 'express';
import { authenticate } from '../middlewares/authenticate.js';
import {
  getCartItemsController,
  updateCartController,
  addToCartController,
  checkoutController,
  deleteCartItemController,
} from '../controllers/order.js';

const router = express.Router();

router.get('/cart', authenticate, getCartItemsController);

router.put('/cart/update', authenticate, updateCartController);

router.post('/cart/add', authenticate, addToCartController);

router.post('/cart/checkout', authenticate, checkoutController);

router.delete('/cart/:productId', authenticate, deleteCartItemController);

export default router;
