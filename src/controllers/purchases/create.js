import createError from 'http-errors';
import { Purchase, User } from '../../models/index.js';
import getDecisionEndsAt from '../../helpers/getDecisionEndsAt.js';
import calculatePurchaseStats from '../../helpers/calculatePurchaseStats.js';
import toPublicPurchase from '../../helpers/toPublicPurchase.js';
import toUserFinancialSnapshot from '../../helpers/toUserFinancialSnapshot.js';

const create = async (req, res) => {
  const { _id: userId } = req.user;
  const {
    name,
    price,
    quantity,
    decisionTimer,
    salary,
    workHoursByWeek,
    expectReturnPercentage,
    investForYear,
    link,
  } = req.body;

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    {
      salary,
      workHoursByWeek,
      expectReturnPercentage,
      investForYear,
    },
    { new: true, runValidators: true },
  );

  if (!updatedUser) {
    throw createError(404, 'User not found');
  }

  const createdAt = new Date();
  const imageUrl = req.file ? `/uploads/purchases/${req.file.filename}` : null;
  const stats = calculatePurchaseStats({
    price,
    quantity,
    salary,
    workHoursByWeek,
    expectReturnPercentage,
    investForYear,
  });

  const purchase = await Purchase.create({
    userId,
    name,
    price,
    quantity,
    decisionTimer,
    salary,
    workHoursByWeek,
    expectReturnPercentage,
    investForYear,
    statistics: stats,
    link: link || null,
    imageUrl,
    status: 'pending',
    decisionEndsAt: getDecisionEndsAt(createdAt, decisionTimer),
  });

  res.status(201).json({
    status: 'success',
    code: 201,
    data: {
      purchase: toPublicPurchase(purchase),
      user: toUserFinancialSnapshot(updatedUser),
    },
  });
};

export default create;
