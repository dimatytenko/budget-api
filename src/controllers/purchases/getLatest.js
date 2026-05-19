import * as purchaseService from '../../services/purchases/purchaseService.js';
import toPublicPurchase from '../../helpers/toPublicPurchase.js';

const getLatest = async (req, res) => {
  const purchase = await purchaseService.getLatestPurchase(req.user._id);

  res.status(200).json({
    status: 'success',
    code: 200,
    data: {
      purchase: toPublicPurchase(purchase),
    },
  });
};

export default getLatest;
