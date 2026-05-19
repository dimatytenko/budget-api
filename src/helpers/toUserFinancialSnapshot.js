const toUserFinancialSnapshot = user => ({
  salary: user.salary,
  workHoursByWeek: user.workHoursByWeek,
  expectReturnPercentage: user.expectReturnPercentage,
  investForYear: user.investForYear,
});

export default toUserFinancialSnapshot;
