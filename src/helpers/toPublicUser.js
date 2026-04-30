const toPublicUser = (user) => ({
  email: user.email,
  name: user.name,
  surname: user.surname,
  salary: user.salary,
});

export default toPublicUser;
