import mongoose from 'mongoose';
import createError from 'http-errors';
import { Purchase } from '../../models/index.js';
import getDecisionEndsAt from '../../helpers/getDecisionEndsAt.js';

const assertValidObjectId = id => {
  if (
    !mongoose.Types.ObjectId.isValid(id) ||
    String(new mongoose.Types.ObjectId(id)) !== id
  ) {
    throw createError(400, 'Invalid purchase id');
  }
};

const findOwnPurchase = async (userId, purchaseId) => {
  assertValidObjectId(purchaseId);

  const purchase = await Purchase.findOne({ _id: purchaseId, userId });

  if (!purchase) {
    throw createError(404, 'Purchase not found');
  }

  return purchase;
};

const listPurchases = async (userId, { status, page, limit, sort, order }) => {
  const filter = { userId };

  if (status?.length) {
    filter.status = { $in: status };
  }

  const sortOrder = order === 'asc' ? 1 : -1;
  const skip = (page - 1) * limit;

  const [purchases, total] = await Promise.all([
    Purchase.find(filter)
      .sort({ [sort]: sortOrder })
      .skip(skip)
      .limit(limit),
    Purchase.countDocuments(filter),
  ]);

  return {
    purchases,
    pagination: {
      page,
      limit,
      total,
      totalPages: total > 0 ? Math.ceil(total / limit) : 0,
    },
  };
};

const getPurchaseById = async (userId, purchaseId) => {
  return findOwnPurchase(userId, purchaseId);
};

const getLatestPurchase = async userId => {
  const purchase = await Purchase.findOne({ userId }).sort({ createdAt: -1 });

  if (!purchase) {
    throw createError(404, 'Purchase not found');
  }

  return purchase;
};

const deletePurchase = async (userId, purchaseId) => {
  assertValidObjectId(purchaseId);

  const purchase = await Purchase.findOneAndDelete({ _id: purchaseId, userId });

  if (!purchase) {
    throw createError(404, 'Purchase not found');
  }

  return purchase;
};

const updatePurchaseStatus = async (userId, purchaseId, status) => {
  const purchase = await findOwnPurchase(userId, purchaseId);

  if (purchase.status !== 'pending') {
    throw createError(400, 'Purchase already finalized');
  }

  const updated = await Purchase.findByIdAndUpdate(
    purchase._id,
    { status },
    { new: true, runValidators: true },
  );

  return updated;
};

const EMPTY_PURCHASE_STATISTICS = {
  totalSaved: 0,
  workHours: 0,
  annualReturn: 0,
  rejectedCount: 0,
  pendingCount: 0,
  boughtCount: 0,
};

const round = (value, decimals = 2) =>
  Math.round(value * 10 ** decimals) / 10 ** decimals;

const getPurchaseStatistics = async userId => {
  const [result] = await Purchase.aggregate([
    { $match: { userId: new mongoose.Types.ObjectId(String(userId)) } },
    {
      $group: {
        _id: null,
        totalSaved: {
          $sum: {
            $cond: [
              { $eq: ['$status', 'rejected'] },
              { $multiply: ['$price', '$quantity'] },
              0,
            ],
          },
        },
        workHours: {
          $sum: { $ifNull: ['$statistics.workHoursToPay', 0] },
        },
        annualReturn: {
          $sum: { $ifNull: ['$statistics.investmentIncome', 0] },
        },
        rejectedCount: {
          $sum: { $cond: [{ $eq: ['$status', 'rejected'] }, 1, 0] },
        },
        pendingCount: {
          $sum: { $cond: [{ $eq: ['$status', 'pending'] }, 1, 0] },
        },
        boughtCount: {
          $sum: { $cond: [{ $eq: ['$status', 'bought'] }, 1, 0] },
        },
      },
    },
  ]);

  if (!result) {
    return EMPTY_PURCHASE_STATISTICS;
  }

  return {
    totalSaved: round(result.totalSaved),
    workHours: round(result.workHours),
    annualReturn: round(result.annualReturn),
    rejectedCount: result.rejectedCount,
    pendingCount: result.pendingCount,
    boughtCount: result.boughtCount,
  };
};

const extendPurchaseDecision = async (userId, purchaseId, payload) => {
  const purchase = await findOwnPurchase(userId, purchaseId);

  if (purchase.status !== 'pending') {
    throw createError(400, 'Purchase must be pending to extend decision time');
  }

  const now = new Date();
  const update = {};

  if (payload.decisionTimer) {
    update.decisionEndsAt = getDecisionEndsAt(now, payload.decisionTimer);
    update.decisionTimer = payload.decisionTimer;
  } else {
    const base = Math.max(
      now.getTime(),
      new Date(purchase.decisionEndsAt).getTime(),
    );
    update.decisionEndsAt = new Date(
      base + payload.additionalHours * 60 * 60 * 1000,
    );
  }

  return Purchase.findByIdAndUpdate(purchase._id, update, {
    new: true,
    runValidators: true,
  });
};

export {
  listPurchases,
  getPurchaseById,
  getLatestPurchase,
  getPurchaseStatistics,
  deletePurchase,
  updatePurchaseStatus,
  extendPurchaseDecision,
};
