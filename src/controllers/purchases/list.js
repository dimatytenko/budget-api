import * as purchaseService from '../../services/purchases/purchaseService.js';
import toPublicPurchase from '../../helpers/toPublicPurchase.js';

const list = async (req, res) => {
  const { purchases, pagination } = await purchaseService.listPurchases(
    req.user._id,
    req.validatedQuery,
  );

  res.status(200).json({
    status: 'success',
    code: 200,
    data: {
      purchases: purchases.map(toPublicPurchase),
      pagination,
    },
  });
};

export default list;
