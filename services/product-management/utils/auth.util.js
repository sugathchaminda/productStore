import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from 'config';

/** Hash password */
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

/** Compare passwords */
const matchPasswords = async (password, encryptedPassword) => {
  const matched = await bcrypt.compare(password, encryptedPassword);
  return matched;
};

/** Generate auth token */
const generateAuthToken = (user) => {
  const { jwt: { jwt_auth_secret: jwtLoginAuthSecret, jwt_expire: jwtExpire } } = config;
  const { _id: id, role, first_name: firstName, last_name: lastName } = user;
  const payload = { id, role, name: `${firstName} ${lastName}` };

  const options = { expiresIn: jwtExpire };

  const token = jwt.sign(payload, jwtLoginAuthSecret, options);
  return token;
};

/** Verify auth token */
const verifyAuthToken = (token) => {
  const { jwt: { jwt_auth_secret: jwtLoginAuthSecret } } = config;

  const decoded = jwt.verify(token, jwtLoginAuthSecret);
  return decoded;
};

export {
  hashPassword,
  matchPasswords,
  generateAuthToken,
  verifyAuthToken,
};
