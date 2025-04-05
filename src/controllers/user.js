import * as authServices from '../services/user.js';
import UserCollection from '../db/models/auth/users.js';
import { accessTokenLifetime } from '../constants/users.js';

export const getInfoController = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await UserCollection.findById(userId).select('name email');
    if (!user) {
      return res.status(401).send('Not authorized');
    }

    res.status(200).json({
      status: 200,
      message: 'Successfully found user',
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const registerController = async (req, res) => {
  const resData = await authServices.register(req.body);

  const { _id, accessToken, refreshToken, refreshTokenValidUntil } =
    resData.session;

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    expires: refreshTokenValidUntil,
  });

  res.cookie('sessionId', _id, {
    httpOnly: true,
    expires: refreshTokenValidUntil,
  });
  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    expires: new Date(Date.now() + accessTokenLifetime),
  });

  res.status(201).json({
    status: 201,
    message: 'Successfully registerd user',
    data: {
      user: resData.user,
      accessToken,
    },
  });
};

export const loginController = async (req, res) => {
  const resData = await authServices.login(req.body);

  const { _id, accessToken, refreshToken, refreshTokenValidUntil } =
    resData.session;

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    expires: refreshTokenValidUntil,
  });

  res.cookie('sessionId', _id, {
    httpOnly: true,
    expires: refreshTokenValidUntil,
  });
  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    expires: new Date(Date.now() + accessTokenLifetime),
  });

  res.json({
    status: 200,
    message: 'Successfully login user',
    data: {
      user: resData.user,
      accessToken,
    },
  });
};

export const logoutController = async (req, res) => {
  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');
  // res.clearCookie('sessionId');
  res.status(200).json({
    status: 200,
    message: 'Successfully logged out',
  });
};

const setupSession = (res, session) => {
  const { _id, refreshToken, refreshTokenValidUntil } = session;

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    expires: refreshTokenValidUntil,
  });

  res.cookie('sessionId', _id, {
    httpOnly: true,
    expires: refreshTokenValidUntil,
  });
};

export const refreshController = async (req, res) => {
  const session = await authServices.refreshUserSession({
    sessionId: req.cookies.sessionId,
    refreshToken: req.cookies.refreshToken,
  });
  setupSession(res, session);
  res.json({
    status: 200,
    message: 'Successfully refreshed a session! ',
    data: {
      accessToken: session.accessToken,
    },
  });
};
