const round = (value, decimals = 2) =>
  Math.round(value * 10 ** decimals) / 10 ** decimals;

/**
 * @param {Object} params
 * @param {number} params.price
 * @param {number} params.quantity
 * @param {number} params.salary - monthly income
 * @param {number} params.workHoursByWeek
 * @param {number} params.expectReturnPercentage - annual return %
 * @param {number} params.investForYear
 * @returns {{ workHoursToPay: number, incomePercent: number, investmentIncome: number }}
 */
const calculatePurchaseStats = ({
  price,
  quantity,
  salary,
  workHoursByWeek,
  expectReturnPercentage,
  investForYear,
}) => {
  const totalPrice = price * quantity;
  const annualWorkHours = workHoursByWeek * 52;
  const hourlyRate =
    annualWorkHours > 0 ? (salary * 12) / annualWorkHours : 0;

  const workHoursToPay =
    hourlyRate > 0 ? round(totalPrice / hourlyRate) : 0;

  const incomePercent =
    salary > 0 ? round((totalPrice / salary) * 100) : 0;

  const investmentIncome = round(
    totalPrice *
      (Math.pow(1 + expectReturnPercentage / 100, investForYear) - 1),
  );

  return {
    workHoursToPay,
    incomePercent,
    investmentIncome,
  };
};

export default calculatePurchaseStats;
