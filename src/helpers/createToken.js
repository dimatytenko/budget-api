import jwt from 'jsonwebtoken';
import createError from 'http-errors';

const createToken = (payload) => {
  if (!process.env.TOKEN_KEY) {
    throw createError(500, 'TOKEN_KEY is not configured');
  }

  return jwt.sign(payload, process.env.TOKEN_KEY, { expiresIn: '1d' });
};

export default createToken;
