import httpStatus from 'http-status';

import { NextFunction, Request, Response } from 'express';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.services';
import catchAsync from '../../utils/catchAsync';

const createStudent = catchAsync(async (req, res) => {
  const { password, student: studentData } = req.body;

  const result = await UserServices.createStudentIntoDB(password, studentData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is created successfully',
    data: result,
  });
});

export const UserControllers = {
  createStudent,
};
