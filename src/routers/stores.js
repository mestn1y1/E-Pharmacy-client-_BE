import express from 'express';
import {
  getNearestStoresController,
  getStoresListController,
  getStoreByIdController,
} from '../controllers/pharmacies.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = express.Router();

router.get('/stores/nearest', ctrlWrapper(getNearestStoresController));

router.get('/stores', ctrlWrapper(getStoresListController));

router.get('/stores/:id', ctrlWrapper(getStoreByIdController));

export default router;
