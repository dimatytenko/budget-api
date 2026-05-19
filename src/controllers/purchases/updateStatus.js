import * as purchaseService from '../../services/purchases/purchaseService.js';
import toPublicPurchase from '../../helpers/toPublicPurchase.js';

const updateStatus = async (req, res) => {
  const purchase = await purchaseService.updatePurchaseStatus(
    req.user._id,
    req.params.id,
    req.body.status,
  );

  res.status(200).json({
    status: 'success',
    code: 200,
    data: {
      purchase: toPublicPurchase(purchase),
    },
  });
};

export default updateStatus;
