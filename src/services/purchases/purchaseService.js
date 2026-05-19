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
  deletePurchase,
  updatePurchaseStatus,
  extendPurchaseDecision,
};
