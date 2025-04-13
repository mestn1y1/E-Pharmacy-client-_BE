import {
  getNearestStores,
  getStoresList,
  getStoreById,
} from '../services/pharmacies.js';

export const getStoresListController = async (req, res) => {
  try {
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

export const getStoreByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const pharmacy = await getStoreById(id);

    if (!pharmacy) {
      return res.status(404).json({
        status: 404,
        message: 'Pharmacy not found',
      });
    }

    res.status(200).json({
      status: 200,
      message: 'Pharmacy found',
      data: pharmacy,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || 'Server error',
    });
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
