import PharmacyCollection from '../db/models/pharmacy/pharmacies.js';
import NearestPharmacyCollection from '../db/models/pharmacy/nearest_pharmacies.js';

export const getStoresList = async () => {
  const pharmacies = await PharmacyCollection.find();
  return pharmacies;
};

export const getStoreById = async (id) => {
  const pharmacy = await PharmacyCollection.findById(id);
  return pharmacy;
};

export const getNearestStores = async () => {
  const pharmacies = await NearestPharmacyCollection.find();
  return pharmacies;
};
