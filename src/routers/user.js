import { Router } from 'express';
import * as userController from '../controllers/user.js';
import {
  userRegisterSchema,
  userLoginSchema,
  refreshSchema,
} from '../validation/user.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = Router();

router.get(
  '/user/user-info',
  authenticate,
  ctrlWrapper(userController.getInfoController),
);

router.post(
  '/user/register',
  validateBody(userRegisterSchema),
  ctrlWrapper(userController.registerController),
);

router.post(
  '/user/login',
  validateBody(userLoginSchema),
  ctrlWrapper(userController.loginController),
);

router.post('/user/logout', ctrlWrapper(userController.logoutController));

router.post(
  '/user/refresh',
  authenticate,
  validateBody(refreshSchema),
  ctrlWrapper(userController.refreshController),
);

export default router;
