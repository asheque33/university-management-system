import { ZodError, ZodIssue } from 'zod';
import { TErrorSources, TGenericErrorReturn } from '../errorInterface';

const statusCode = 400;
const handleZodError = (error: ZodError): TGenericErrorReturn => {
  const errorSources: TErrorSources = error.issues.map((issue: ZodIssue) => ({
    path: issue.path[issue.path.length - 1],
    message: issue?.message,
  }));
  // ! request e required kono property na pathale mongoose validation error [2nd layer errHandler -> jokhon zod validation kora hoy{create/update}]
  return {
    statusCode,
    message: 'Validation error',
    errorSources,
  };
};
export default handleZodError;
