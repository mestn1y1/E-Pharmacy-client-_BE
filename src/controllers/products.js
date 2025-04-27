import { getAllProducts, getProductById } from '../services/products.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';

export const getProductsController = async (req, res, next) => {
  try {
    const { page, perPage } = parsePaginationParams(req.query);
    const { name, category, discount } = req.query;

    const result = await getAllProducts({
      name,
      category,
      discount,
      page,
      perPage,
    });

    res.status(200).json({
      status: 200,
      message: 'Products fetched successfully',
      data: result,
    });
  } catch (error) {
    next(error);
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
