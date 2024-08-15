import mongoose from 'mongoose';
import { TErrorSources, TGenericErrorReturn } from '../errorInterface';

const statusCode = 400;
const handleMongooseValidationError = (
  err: mongoose.Error.ValidationError,
): TGenericErrorReturn => {
  const errorSources: TErrorSources = Object.values(err.errors).map(
    (val: mongoose.Error.CastError | mongoose.Error.ValidatorError) => ({
      path: val?.path,
      message: val?.message,
    }),
  );
  // ! request e required kono property na pathale mongoose validation error [1st layer errHandler -> jokhon zod validation na kora hoy{create/update}]
  return {
    statusCode,
    message: 'Validation error',
    errorSources,
  };
};
export default handleMongooseValidationError;
