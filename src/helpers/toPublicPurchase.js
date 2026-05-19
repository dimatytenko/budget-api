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
  status: purchase.status,
  decisionEndsAt: purchase.decisionEndsAt,
  createdAt: purchase.createdAt,
  updatedAt: purchase.updatedAt,
});

export default toPublicPurchase;
