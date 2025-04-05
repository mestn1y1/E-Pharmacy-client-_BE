import express from 'express';
import {
  getNearestStoresController,
  getStoresListController,
} from '../controllers/pharmacies.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = express.Router();

router.get('/stores/nearest', ctrlWrapper(getNearestStoresController));

router.get('/stores', ctrlWrapper(getStoresListController));

export default router;
