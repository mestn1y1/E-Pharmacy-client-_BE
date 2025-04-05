import { Schema, model } from 'mongoose';

const nearestPharmacySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
  },
  { versionKey: false, timestamps: true },
);

const NearestPharmacyCollection = model(
  'nearest_pharmacy',
  nearestPharmacySchema,
);

export default NearestPharmacyCollection;
