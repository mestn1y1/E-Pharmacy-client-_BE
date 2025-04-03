import { Schema, model } from 'mongoose';
import { emailRegexp } from '../../../constants/users.js';

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    email: {
      type: String,
      match: emailRegexp,
      required: [true, 'Email is required'],
      unique: true,
    },

    name: {
      type: String,
    },

    phone: {
      type: String,
    },

    token: {
      type: String,
      default: null,
    },

    verificationToken: {
      type: String,
      required: [true, 'Verify token is required'],
    },
  },
  { versionKey: false, timestamps: true },
);

const UserCollection = model('user', userSchema);

export default UserCollection;
