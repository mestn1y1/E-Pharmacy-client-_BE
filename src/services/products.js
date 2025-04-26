import ProductCollection from '../db/models/pharmacy/products.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

// export const getAllProducts = async ({ name, category, page, perPage }) => {
//   const limit = perPage;
//   const skip = (page - 1) * perPage;

//   const filter = {};

//   if (name?.trim()) {
//     filter.name = { $regex: name.trim(), $options: 'i' };
//   }

//   if (category?.trim()) {
//     filter.category = category.trim();
//   }

//   const totalItems = await ProductCollection.countDocuments(filter);
//   const products = await ProductCollection.find(filter)
//     .skip(skip)
//     .limit(limit)
//     .exec();

//   const paginationData = calculatePaginationData(totalItems, perPage, page);

//   return {
//     products,
//     ...paginationData,
//   };
// };
export const getAllProducts = async ({
  name,
  category,
  discount,
  page,
  perPage,
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const filter = {};

  if (name?.trim()) {
    filter.name = { $regex: name.trim(), $options: 'i' };
  }

  if (category?.trim()) {
    filter.category = category.trim();
  }

  if (discount) {
    filter.discount = discount;
  }

  const totalItems = await ProductCollection.countDocuments(filter);
  const products = await ProductCollection.find(filter)
    .skip(skip)
    .limit(limit)
    .exec();

  const paginationData = calculatePaginationData(totalItems, perPage, page);

  return {
    products,
    ...paginationData,
  };
};

export const getProductById = async (id) => {
  return await ProductCollection.findById(id);
};
