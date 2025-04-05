import { Schema, model } from 'mongoose';

const reviewSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    testimonial: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true },
);

const ReviewCollection = model('review', reviewSchema);

export default ReviewCollection;
