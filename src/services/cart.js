import CartCollection from '../db/models/pharmacy/cart.js';
import OrderCollection from '../db/models/pharmacy/orders.js';
import ProductCollection from '../db/models/pharmacy/products.js';

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

export const addToCart = async (userId, productId, quantity) => {
  try {
    const product = await ProductCollection.findById(productId);
    if (!product) {
      throw new Error('Product not found');
    }

    const cartItem = await CartCollection.create({
      userId,
      productId,
      quantity,
      price: product.price,
    });
    return cartItem;
  } catch (error) {
    console.error('Error adding to cart:', error);
    throw error;
  }
};

export const checkout = async (orderData) => {
  const {
    userId,
    paymentMethod,
    shippingAddress,
    items,
    customerInfo,
    totalAmount,
  } = orderData;

  if (!items || items.length === 0) {
    throw new Error('No items in the order');
  }

  try {
    const order = await OrderCollection.create({
      userId,
      customerInfo,
      items: items.map((item) => ({
        productId: item.productId,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      })),
      paymentMethod,
      shippingAddress,
      totalAmount,
      status: 'Pending',
      orderDate: new Date(),
    });
    await CartCollection.deleteMany({ userId });
    return order;
  } catch (error) {}
};
