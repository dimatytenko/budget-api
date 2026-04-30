import createError from 'http-errors';
import { User } from '../../models/index.js';
import toPublicUser from '../../helpers/toPublicUser.js';

const updateCurrent = async (req, res) => {
  const { _id } = req.user;
  const { name, surname, salary } = req.body;

  const updateData = {};

  if (name !== undefined) updateData.name = name;
  if (surname !== undefined) updateData.surname = surname;
  if (salary !== undefined) updateData.salary = salary;

  if (Object.keys(updateData).length === 0) {
    throw createError(400, 'At least one field is required: name, surname, salary');
  }

  const updatedUser = await User.findByIdAndUpdate(_id, updateData, {
    new: true,
    runValidators: true,
  }).select('email name surname salary');

  if (!updatedUser) {
    throw createError(404, 'User not found');
  }

  res.status(200).json({
    status: 'success',
    code: 200,
    data: {
      user: toPublicUser(updatedUser),
    },
  });
};

export default updateCurrent;
