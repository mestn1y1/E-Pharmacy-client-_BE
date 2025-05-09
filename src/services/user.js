import UserCollection from '../db/models/auth/users.js';
import SessionCollection from '../db/models/auth/session.js';
import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import {
  accessTokenLifetime,
  refreshTokenLifetime,
} from '../constants/users.js';

export const getUserInfo = async (userId) => {
  return await UserCollection.findById(userId).select('-password -tokens');
};

export const register = async (payload) => {
  const { email, password } = payload;
  const user = await UserCollection.findOne({ email });
  if (user) {
    throw createHttpError(409, 'Email already in use');
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const persistUser = await UserCollection.create({
    ...payload,
    password: hashPassword,
  });
  const session = await createSessionForUser(persistUser._id);
  return { user: persistUser, session: session };
};


export const login = async ({ email, password }) => {
  const user = await UserCollection.findOne({ email });

  if (!user) {
    throw createHttpError(401, 'Email or password invalid');
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw createHttpError(401, 'Email or password invalid');
  }

  const session = await createSessionForUser(user._id);
  return { user, session };
};

const createSession = () => {
  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');

  return {
    accessToken,
    refreshToken,
    accessTokenValidUntil: Date.now() + accessTokenLifetime,
    refreshTokenValidUntil: Date.now() + refreshTokenLifetime,
  };
};

export const refreshUserSession = async ({ sessionId, refreshToken }) => {
  const session = await SessionCollection.findOne({
    _id: sessionId,
    refreshToken,
  });

  if (!session) {
    throw createHttpError(401, 'Session not found');
  }

  const isSessionTokenExpired =
    new Date() > new Date(session.refreshTokenValidUntil);

  if (isSessionTokenExpired) {
    throw createHttpError(401, 'Session token expired');
  }

  const newSession = createSession();

  await SessionCollection.deleteOne({ _id: sessionId, refreshToken });

  return await SessionCollection.create({
    userId: session.userId,
    ...newSession,
  });
};

const createSessionForUser = async (userId) => {
  await SessionCollection.deleteOne({ userId: userId });
  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');
  return await SessionCollection.create({
    userId: userId,
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + accessTokenLifetime),
    refreshTokenValidUntil: new Date(Date.now() + refreshTokenLifetime),
  });
};
export const findSession = (filter) => SessionCollection.findOne(filter);

export const findUser = (filter) => UserCollection.findOne(filter);
