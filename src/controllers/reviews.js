import { getAllReviews } from '../services/reviews.js';

export const getCustomerReviewsController = async (req, res) => {
  try {
    const reviews = await getAllReviews();
    res.status(200).json({
      status: 200,
      message: 'Customer reviews fetched successfully',
      data: reviews,
    });
  } catch (error) {
    console.error('Error fetching reviews:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};
