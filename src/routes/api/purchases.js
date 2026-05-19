import express from 'express';

const router = express.Router();

import purchasesCtrl from '../../controllers/purchases/index.js';
import {
  schemaValidation,
  auth,
  ctrlWrapper,
  uploadPurchaseImage,
} from '../../middlewares/index.js';
import { purchaseCreate } from '../../models/purchase.js';

router.post(
  '/',
  auth,
  uploadPurchaseImage,
  schemaValidation(purchaseCreate),
  ctrlWrapper(purchasesCtrl.create),
);

export default router;
