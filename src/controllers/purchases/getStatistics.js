import * as purchaseService from '../../services/purchases/purchaseService.js';

const getStatistics = async (req, res) => {
  const statistics = await purchaseService.getPurchaseStatistics(req.user._id);

  res.status(200).json({
    status: 'success',
    code: 200,
    data: { statistics },
  });
};

export default getStatistics;
