import createError from 'http-errors';
import { User } from '../../models/index.js';
import toPublicUser from '../../helpers/toPublicUser.js';

const updateCurrent = async (req, res) => {
  const { _id } = req.user;
  const {
    firstName,
    lastName,
    salary,
    workHoursByWeek,
    expectReturnPercentage,
    investForYear,
  } = req.body;

  const updateData = {};

  if (firstName !== undefined) updateData.firstName = firstName;
  if (lastName !== undefined) updateData.lastName = lastName;
  if (salary !== undefined) updateData.salary = salary;
  if (workHoursByWeek !== undefined)
    updateData.workHoursByWeek = workHoursByWeek;
  if (expectReturnPercentage !== undefined)
    updateData.expectReturnPercentage = expectReturnPercentage;
  if (investForYear !== undefined) updateData.investForYear = investForYear;

  if (Object.keys(updateData).length === 0) {
    throw createError(
      400,
      'At least one field is required: firstName, lastName, salary, workHoursByWeek, expectReturnPercentage, investForYear',
    );
  }

  const updatedUser = await User.findByIdAndUpdate(_id, updateData, {
    new: true,
    runValidators: true,
  });

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
