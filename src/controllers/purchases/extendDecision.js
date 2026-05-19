import * as purchaseService from '../../services/purchases/purchaseService.js';
import toPublicPurchase from '../../helpers/toPublicPurchase.js';

const extendDecision = async (req, res) => {
  const purchase = await purchaseService.extendPurchaseDecision(
    req.user._id,
    req.params.id,
    req.body,
  );

  res.status(200).json({
    status: 'success',
    code: 200,
    data: {
      purchase: toPublicPurchase(purchase),
    },
  });
};

export default extendDecision;
