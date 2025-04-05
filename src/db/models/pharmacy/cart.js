import { Schema, model } from 'mongoose';

const cartSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    productId: {
      type: Schema.Types.ObjectId,
      ref: 'products',
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  { versionKey: false, timestamps: true },
);

cartSchema.post('save', function (doc, next) {
  next();
});

const CartCollection = model('Cart', cartSchema);

export default CartCollection;
