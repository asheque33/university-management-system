import { academicSemesterServices } from './academicSemester.services';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

const createAcademicSemester = catchAsync(async (req, res) => {
  const result = await academicSemesterServices.createAcademicSemesterIntoDB(
    req.body,
  );
  // 2ta topic sendResponse fn er bhitore (res,data)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semester created successfully',
    data: result,
  });
});

const getAcademicSemesters = catchAsync(async (req, res) => {
  const result = await academicSemesterServices.getAcademicSemestersFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semesters retrieved successfully',
    data: result,
  });
});

export const academicSemesterController = {
  createAcademicSemester,
  getAcademicSemesters,
};
