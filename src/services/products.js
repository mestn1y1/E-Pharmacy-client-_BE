import ProductCollection from '../db/models/pharmacy/products.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getAllProducts = async ({ name, category, page, perPage }) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const filter = {};
  if (name) {
    filter.name = { $regex: name, $options: 'i' };
  }
  if (category) {
    filter.category = category;
  }

  const productsQuery = ProductCollection.find(filter);
  const totalItems = await ProductCollection.countDocuments(filter);
  const products = await productsQuery.skip(skip).limit(limit).exec();

  const paginationData = calculatePaginationData(totalItems, perPage, page);

  return {
    products,
    ...paginationData,
  };
};

export const getProductById = async (id) => {
  return await ProductCollection.findById(id);
};
