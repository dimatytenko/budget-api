import jwt from 'jsonwebtoken';
import createError from 'http-errors';
import { User } from '../models/index.js';

const auth = async (req, res, next) => {
  const { authorization = '' } = req.headers;
  const [bearer, token] = authorization.split(' ');

  try {
    if (!process.env.TOKEN_KEY) {
      throw createError(500, 'TOKEN_KEY is not configured');
    }

    if (bearer !== 'Bearer' || !token) {
      throw new Error('Not authorized');
    }

    const { id } = jwt.verify(token, process.env.TOKEN_KEY);
    const user = await User.findById(id);

    if (!user || token !== user.token) {
      throw new Error('Not authorized');
    }

    req.user = user;
    next();
  } catch (error) {
    error.status = 401;
    error.message = 'Not authorized';
    next(error);
  }
};

export default auth;
