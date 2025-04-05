import { isValidObjectId } from 'mongoose';
import createHttpError from 'http-errors';

export const isValidId = (req, res, next) => {
  const { _id } = req.params;
  if (!isValidObjectId(_id)) {
    next(createHttpError(400, 'Bad Request. Invalid identifier format.'));
  }

  next();
};
