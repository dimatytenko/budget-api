import createError from 'http-errors';
import bcrypt from 'bcrypt';

import { User } from '../../models/index.js';
import createToken from '../../helpers/createToken.js';
import toPublicUser from '../../helpers/toPublicUser.js';

const login = async (req, res) => {
  const { email, password } = req.body;
  const normalizedEmail = email.toLowerCase().trim();

  const user = await User.findOne({ email: normalizedEmail }).select('+password');

  if (user && (await bcrypt.compare(password, user.password))) {
    const payload = { id: user._id, email: normalizedEmail };
    const token = createToken(payload);

    await User.findByIdAndUpdate(user._id, { token });

    return res.status(200).json({
      status: 'success',
      code: 200,
      data: {
        token,
        user: toPublicUser(user),
      },
    });
  }
  throw createError(401, 'Invalid credentials');
};

export default login;
