import { getAllProducts, getProductById } from '../services/products.js';

export const getProductsController = async (req, res) => {
  try {
    const products = await getAllProducts(req.query);
    res.status(200).json({
      status: 200,
      message: 'Products fetched successfully',
      data: products,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getProductByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await getProductById(id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({
      status: 200,
      message: 'Product details fetched successfully',
      data: product,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
