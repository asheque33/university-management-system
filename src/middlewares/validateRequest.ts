import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';

export const validateRequest = (schema: AnyZodObject) => {
  // const zodParsedData = studentValidationSchema.parse(studentData);
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // ! For validation checking
      //  if everything ok then call next()-> controller
      await schema.parseAsync(req.body);
      return next();
    } catch (error) {
      next(error);
    }
  };
};
