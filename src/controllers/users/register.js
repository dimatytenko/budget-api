import createError from 'http-errors';
import bcrypt from 'bcrypt';

import { User } from '../../models/index.js';
import createToken from '../../helpers/createToken.js';

const register = async (req, res) => {
  const { email, password } = req.body;
  const normalizedEmail = email.toLowerCase().trim();

  let user = await User.findOne({ email: normalizedEmail });

  if (user) {
    throw createError(409, 'This email address is already being used!');
  }

  const encryptedPassword = await bcrypt.hash(password, 10);

  user = await User.create({
    email: normalizedEmail,
    password: encryptedPassword,
  });
  const payload = { id: user._id, email: normalizedEmail };
  const token = createToken(payload);
  await User.findByIdAndUpdate(user._id, { token });

  res.status(201).json({
    status: 'success',
    code: 201,
    data: {
      token,
      user: {
        email: user.email,
      },
    },
  });
};

export default register;
