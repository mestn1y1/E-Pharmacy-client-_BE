import CartCollection from '../db/models/pharmacy/cart.js';
import OrderCollection from '../db/models/pharmacy/orders.js';

export const getCartItems = async (userId) => {
  return await CartCollection.find({ userId });
};

export const updateCartItem = async (userId, productId, quantity) => {
  return await CartCollection.findOneAndUpdate(
    { userId, productId },
    { $set: { quantity } },
    { new: true },
  );
};

export const deleteCartItem = async (userId, productId) => {
  const deletedItem = await CartCollection.findOneAndDelete({
    userId,
    productId,
  });

  if (!deletedItem) {
    throw new Error('Product not found in cart');
  }

  return deletedItem;
};

export const checkout = async (userId, paymentMethod, shippingAddress) => {
  const cartItems = await CartCollection.find({ userId });

  if (!cartItems || cartItems.length === 0) {
    throw new Error('Cart is empty');
  }

  const order = await OrderCollection.create({
    userId,
    items: cartItems,
    paymentMethod,
    shippingAddress,
    status: 'Pending',
  });

  await CartCollection.deleteMany({ userId });

  return order;
};

export const addToCart = async (userId, productId, quantity) => {
  const cartItem = await CartCollection.create({
    userId,
    productId,
    quantity,
  });
  return cartItem;
};
