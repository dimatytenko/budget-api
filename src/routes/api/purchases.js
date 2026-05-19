import express from 'express';

const router = express.Router();

import purchasesCtrl from '../../controllers/purchases/index.js';
import {
  schemaValidation,
  queryValidation,
  auth,
  ctrlWrapper,
  uploadPurchaseImage,
} from '../../middlewares/index.js';
import {
  purchaseCreate,
  purchaseListQuery,
  purchaseStatusUpdate,
  purchaseExtendDecision,
} from '../../models/purchase.js';

router.get(
  '/',
  auth,
  queryValidation(purchaseListQuery),
  ctrlWrapper(purchasesCtrl.list),
);
router.get('/latest', auth, ctrlWrapper(purchasesCtrl.getLatest));
router.get('/:id', auth, ctrlWrapper(purchasesCtrl.getById));
router.delete('/:id', auth, ctrlWrapper(purchasesCtrl.remove));
router.patch(
  '/:id/status',
  auth,
  schemaValidation(purchaseStatusUpdate),
  ctrlWrapper(purchasesCtrl.updateStatus),
);
router.patch(
  '/:id/extend-decision',
  auth,
  schemaValidation(purchaseExtendDecision),
  ctrlWrapper(purchasesCtrl.extendDecision),
);
router.post(
  '/',
  auth,
  uploadPurchaseImage,
  schemaValidation(purchaseCreate),
  ctrlWrapper(purchasesCtrl.create),
);

export default router;
