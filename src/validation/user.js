import Joi from 'joi';
import { emailRegexp } from '../constants/users.js';
export const refreshSchema = Joi.object({
  refreshToken: Joi.string().required(),
});

export const userRegisterSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).email().required().messages({
    'string.pattern.base': 'Email format is invalid',
    'string.email': 'Email must be a valid email',
    'string.empty': 'Email is required',
  }),
  password: Joi.string().min(8).max(64).required().messages({
    'string.min': 'Password must be at least 8 characters',
    'string.max': 'Password can be up to 64 characters',
    'string.empty': 'Password is required',
  }),
  name: Joi.string().min(3).max(30).required(),
  phone: Joi.string()
    .pattern(/^\+?[1-9]\d{1,14}$/)
    .required()
    .messages({
      'string.pattern.base':
        'Phone number is invalid. It should be in international format.',
      'string.empty': 'Phone number is required',
    }),
});

export const userLoginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Email must be a valid email',
    'string.empty': 'Email is required',
  }),

  password: Joi.string().min(8).max(64).required().messages({
    'string.min': 'Password must be at least 8 characters',
    'string.max': 'Password can be up to 64 characters',
    'string.empty': 'Password is required',
  }),
});
