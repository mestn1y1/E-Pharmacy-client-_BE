import { Schema, model } from 'mongoose';

const orderSchema = new Schema(
  {
    photo: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    products: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: [
        'Pending',
        'Processing',
        'Shipped',
        'Cancelled',
        'Confirmed',
        'Completed',
        'Delivered',
      ],
      default: 'Pending',
    },
    order_date: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true },
);

const OrderCollection = model('order', orderSchema);

export default OrderCollection;
