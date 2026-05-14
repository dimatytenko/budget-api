const toPublicUser = user => ({
  id: user._id,
  email: user.email,
  firstName: user.firstName,
  lastName: user.lastName,
  salary: user.salary,
  workHoursByWeek: user.workHoursByWeek,
  expectReturnPercentage: user.expectReturnPercentage,
  investForYear: user.investForYear,
});

export default toPublicUser;
