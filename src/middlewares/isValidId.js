import { isValidObjectId } from 'mongoose';
import createHttpError from 'http-errors';

export const isValidId = (req, res, next) => {
  const { userId } = req.params;
  if (!isValidObjectId(userId)) {
    next(createHttpError(400, 'Bad Request. Invalid identifier format.'));
  }

  next();
};
