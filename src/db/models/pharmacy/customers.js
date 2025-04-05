import { Schema, model } from 'mongoose';

const customerSchema = new Schema(
  {
    photo: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    spent: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    register_date: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true },
);

const CustomerCollection = model('customer', customerSchema);

export default CustomerCollection;
