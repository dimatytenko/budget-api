import createError from 'http-errors';
import bcrypt from 'bcrypt';

import { User } from '../../models/index.js';
import createToken from '../../helpers/createToken.js';

const register = async (req, res) => {
  const { email, password } = req.body;

  let user = await User.findOne({ email });

  if (user) {
    throw createError(409, 'This email address is already being used!');
  }

  const encryptedPassword = await bcrypt.hash(password, 10);

  user = await User.create({
    email,
    password: encryptedPassword,
  });
  const payload = { id: user._id, email };
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
