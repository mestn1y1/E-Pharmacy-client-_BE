import { Schema, model } from 'mongoose';

const cartSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'users', // Предполагается, что у тебя есть коллекция User
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
      min: 1, // Минимальное количество товара — 1
    },
  },
  { versionKey: false, timestamps: true },
);

// Удаление товаров, когда они покупаются (когда заказ оформлен)
cartSchema.post('save', function (doc, next) {
  // Здесь можно добавить логику для очистки корзины после оформления заказа, например
  next();
});

const CartCollection = model('Cart', cartSchema);

export default CartCollection;
