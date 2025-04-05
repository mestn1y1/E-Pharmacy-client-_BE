import { getNearestStores, getStoresList } from '../services/pharmacies.js';

export const getStoresListController = async (req, res) => {
  try {
    // Получаем список всех аптек
    const storesList = await getStoresList();

    res.status(200).json({
      status: 200,
      message: 'Successfully retrieved pharmacies list',
      data: storesList,
    });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Server error' });
  }
};

export const getNearestStoresController = async (req, res) => {
  try {
    const nearestStores = await getNearestStores();

    res.status(200).json({
      status: 200,
      message: 'Successfully retrieved pharmacies list',
      data: nearestStores,
    });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Server error' });
  }
};
