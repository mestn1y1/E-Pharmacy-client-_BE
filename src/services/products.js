import ProductCollection from '../db/models/pharmacy/products.js';

// Получение всех продуктов с фильтрацией по имени и категории
export const getAllProducts = async (query) => {
  const { name, category } = query;

  const filter = {};
  if (name) {
    filter.name = { $regex: name, $options: 'i' }; // поиск без учета регистра
  }
  if (category) {
    filter.category = category;
  }

  return await ProductCollection.find(filter);
};

// Получение одного продукта по ID
export const getProductById = async (id) => {
  return await ProductCollection.findById(id);
};
