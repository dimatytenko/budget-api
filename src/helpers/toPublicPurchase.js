/**
 * @typedef {Object} PublicPurchaseStatistics
 * @property {number} workHoursToPay - work hours needed to pay (decimal hours)
 * @property {number} incomePercent - share of monthly income, %
 * @property {number} investmentIncome - potential investment gain over investForYear
 */

/**
 * @typedef {Object} PublicPurchase
 * @property {string} id
 * @property {string} userId
 * @property {string} name
 * @property {string|null} link
 * @property {string|null} imageUrl
 * @property {number} price
 * @property {number} quantity
 * @property {'12h'|'24h'|'48h'|'72h'} decisionTimer
 * @property {number} salary
 * @property {number} workHoursByWeek
 * @property {number} expectReturnPercentage
 * @property {number} investForYear
 * @property {PublicPurchaseStatistics} statistics
 * @property {'pending'|'bought'|'rejected'} status
 * @property {Date} decisionEndsAt
 * @property {Date} createdAt
 * @property {Date} updatedAt
 */

/**
 * @param {import('mongoose').Document} purchase
 * @returns {PublicPurchase}
 */
const toPublicPurchase = purchase => ({
  id: purchase._id,
  userId: purchase.userId,
  name: purchase.name,
  link: purchase.link,
  imageUrl: purchase.imageUrl,
  price: purchase.price,
  quantity: purchase.quantity,
  decisionTimer: purchase.decisionTimer,
  salary: purchase.salary,
  workHoursByWeek: purchase.workHoursByWeek,
  expectReturnPercentage: purchase.expectReturnPercentage,
  investForYear: purchase.investForYear,
  statistics: {
    workHoursToPay: purchase.statistics.workHoursToPay,
    incomePercent: purchase.statistics.incomePercent,
    investmentIncome: purchase.statistics.investmentIncome,
  },
  status: purchase.status,
  decisionEndsAt: purchase.decisionEndsAt,
  createdAt: purchase.createdAt,
  updatedAt: purchase.updatedAt,
});

export default toPublicPurchase;
