// import { Schema, model } from 'mongoose';

// const orderSchema = new Schema(
//   {
//     photo: {
//       type: String,
//     },
//     name: {
//       type: String,
//       required: true,
//     },
//     address: {
//       type: String,
//       required: true,
//     },
//     products: {
//       type: Number,
//       required: true,
//     },
//     price: {
//       type: Number,
//       required: true,
//     },
//     status: {
//       type: String,
//       enum: [
//         'Pending',
//         'Processing',
//         'Shipped',
//         'Cancelled',
//         'Confirmed',
//         'Completed',
//         'Delivered',
//       ],
//       default: 'Pending',
//     },
//     order_date: {
//       type: String,
//       required: true,
//     },
//   },
//   { versionKey: false, timestamps: true },
// );

// const OrderCollection = model('order', orderSchema);

// export default OrderCollection;
import { Schema, model } from 'mongoose';

const orderSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    customerInfo: {
      name: {
        type: String,
        required: true,
      },
      email: {
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
    },
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: 'products',
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    shippingAddress: {
      type: String,
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
    orderDate: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false, timestamps: true },
);

const OrderCollection = model('order', orderSchema);

export default OrderCollection;
