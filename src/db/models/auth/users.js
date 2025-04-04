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
  },
  { versionKey: false, timestamps: true },
);

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

const UserCollection = model('user', userSchema);

export default UserCollection;
