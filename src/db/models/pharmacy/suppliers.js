import { Schema, model } from 'mongoose';

const supplierSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    suppliers: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    amount: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['Active', 'Inactive', 'Pending'],
      required: true,
    },
  },
  { versionKey: false, timestamps: true },
);

const SuppliersCollection = model('supplier', supplierSchema);

export default SuppliersCollection;
