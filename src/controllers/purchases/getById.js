import * as purchaseService from '../../services/purchases/purchaseService.js';
import toPublicPurchase from '../../helpers/toPublicPurchase.js';

const getById = async (req, res) => {
  const purchase = await purchaseService.getPurchaseById(
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

export default getById;
