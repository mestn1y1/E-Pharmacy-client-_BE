import express from 'express';
import { getCustomerReviewsController } from '../controllers/reviews.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = express.Router();

router.get('/customer-reviews', ctrlWrapper(getCustomerReviewsController));

export default router;
