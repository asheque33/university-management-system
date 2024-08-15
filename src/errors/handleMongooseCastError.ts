import mongoose from 'mongoose';
import { TErrorSources, TGenericErrorReturn } from '../errorInterface';

const statusCode = 400;
const handleMongooseCastError = (
  error: mongoose.Error.CastError,
): TGenericErrorReturn => {
  const errorSources: TErrorSources = [
    {
      path: error?.path,
      message: error?.message,
    },
  ];
  // single doc get korte wrong _id/id diye try korle
  return {
    statusCode,
    message: 'Invalid ID',
    errorSources,
  };
};
export default handleMongooseCastError;
