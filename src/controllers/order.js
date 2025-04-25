import {
  getCartItems,
  updateCartItem,
  addToCart,
  checkout,
  deleteCartItem,
} from '../services/cart.js';

export const getCartItemsController = async (req, res) => {
  try {
    const userId = req.user._id;
    const cartItems = await getCartItems(userId);

    if (!cartItems || cartItems.length === 0) {
      return res.status(404).json({ message: 'Cart is empty' });
    }

    res.status(200).json({
      status: 200,
      message: 'Cart items retrieved successfully',
      data: cartItems,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateCartController = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user._id;

    if (!productId || quantity === undefined) {
      return res
        .status(400)
        .json({ message: 'Product ID and quantity are required' });
    }

    const updatedCartItem = await updateCartItem(userId, productId, quantity);

    if (!updatedCartItem) {
      return res.status(404).json({ message: 'Cart item not found' });
    }

    res.status(200).json({
      status: 200,
      message: 'Cart item updated successfully',
      data: updatedCartItem,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// export const addToCartController = async (req, res) => {
//   try {
//     const { productId, quantity } = req.body;
//     const userId = req.user._id;

//     if (!productId || quantity === undefined) {
//       return res
//         .status(400)
//         .json({ message: 'Product ID and quantity are required' });
//     }

//     const cartItem = await addToCart(userId, productId, quantity);

//     res.status(201).json({
//       status: 201,
//       message: 'Product added to cart successfully',
//       data: cartItem,
//     });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// };

export const addToCartController = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user._id;

    if (!productId || quantity === undefined) {
      return res
        .status(400)
        .json({ message: 'Product ID and quantity are required' });
    }

    const cartItem = await addToCart(userId, productId, quantity);

    res.status(201).json({
      status: 201,
      message: 'Product added to cart successfully',
      data: cartItem,
    });
  } catch (error) {
    let message = 'Server error';
    if (error.message === 'Product not found') {
      message = 'Product not found';
      return res.status(404).json({ message });
    }
    res.status(500).json({ message });
  }
};

export const deleteCartItemController = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user._id;

    if (!productId) {
      return res.status(400).json({ message: 'Product ID is required' });
    }

    const deletedItem = await deleteCartItem(userId, productId);

    res.status(200).json({
      status: 200,
      message: 'Product removed from cart successfully',
      data: deletedItem,
    });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Server error' });
  }
};

    // export const checkoutController = async (req, res) => {
    //   try {
    //     const userId = req.user._id;
    //     const { paymentMethod, shippingAddress } = req.body;

    //     if (!paymentMethod || !shippingAddress) {
    //       return res
    //         .status(400)
    //         .json({ message: 'Payment method and shipping address are required' });
    //     }

    //     const order = await checkout(userId, paymentMethod, shippingAddress);

    //     res.status(200).json({
    //       status: 200,
    //       message: 'Order placed successfully',
    //       data: order,
    //     });
    //   } catch (error) {
    //     res.status(500).json({ message: 'Server error' });
    //   }
// };
    export const checkoutController = async (req, res) => {
      try {
        const userId = req.user._id;
        const { name, email, phone, address, paymentMethod, total } = req.body;

        if (
          !name ||
          !email ||
          !phone ||
          !address ||
          !paymentMethod ||
          total === undefined
        ) {
          return res
            .status(400)
            .json({
              message:
                'Name, email, phone, address, payment method, and total are required',
            });
        }

        const cartItems = await getCartItems(userId);

        if (!cartItems || cartItems.length === 0) {
          return res
            .status(400)
            .json({ message: 'Cannot place order with an empty cart' });
        }

        const orderData = {
          userId,
          customerInfo: {
            name,
            email,
            phone,
            address,
          },
          paymentMethod,
          totalAmount: total,
          items: cartItems,
        };

        const order = await checkout(orderData);

        res.status(200).json({
          status: 200,
          message: 'Order placed successfully',
          data: order,
        });
      } catch (error) {
        console.error('Error during checkout:', error);
        res.status(500).json({ message: 'Server error' });
      }
    };