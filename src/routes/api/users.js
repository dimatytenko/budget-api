import express from 'express';

const router = express.Router();

import usersCtrl from '../../controllers/users/index.js';
import {
  schemaValidation,
  auth,
  ctrlWrapper,
} from '../../middlewares/index.js';
import { userAdd, userLogin, userUpdate } from '../../models/user.js';

router.post(
  '/register',
  schemaValidation(userAdd),
  ctrlWrapper(usersCtrl.register),
);
router.post(
  '/login',
  schemaValidation(userLogin),
  ctrlWrapper(usersCtrl.login),
);
router.get('/me', auth, ctrlWrapper(usersCtrl.getCurrent));
router.patch(
  '/me',
  auth,
  schemaValidation(userUpdate),
  ctrlWrapper(usersCtrl.updateCurrent),
);
router.post('/logout', auth, ctrlWrapper(usersCtrl.logout));
export default router;
