import ReviewCollection from '../db/models/pharmacy/reviews.js';

export const getAllReviews = async () => {
  const reviews = await ReviewCollection.find().sort({ createdAt: -1 });
  return reviews;
};
