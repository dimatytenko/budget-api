const toPublicUser = user => ({
  id: user._id,
  email: user.email,
  name: user.name,
  surname: user.surname,
  salary: user.salary,
});

export default toPublicUser;
