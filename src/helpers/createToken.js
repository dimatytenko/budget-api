import jwt from 'jsonwebtoken';

const createToken = (payload) =>
  jwt.sign(payload, process.env.TOKEN_KEY, { expiresIn: '1d' });

export default createToken;
