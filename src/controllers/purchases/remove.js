import * as purchaseService from '../../services/purchases/purchaseService.js';
import toPublicPurchase from '../../helpers/toPublicPurchase.js';

const remove = async (req, res) => {
  const purchase = await purchaseService.deletePurchase(
    req.user._id,
    req.params.id,
  );

  res.status(200).json({
    status: 'success',
    code: 200,
    data: {
      purchase: toPublicPurchase(purchase),
    },
  });
};

export default remove;
