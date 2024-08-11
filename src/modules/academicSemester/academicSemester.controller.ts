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
const getAcademicSemesterById = catchAsync(async (req, res) => {
  console.log(req.params);
  const result = await academicSemesterServices.getAcademicSemesterByIdFromDB(
    req.params.semesterId,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semester retrieved successfully',
    data: result,
  });
});
const updateAcademicSemesterById = catchAsync(async (req, res) => {
  console.log(req.params, req.body);
  const result = await academicSemesterServices.updateAcademicSemesterByIdInDB(
    req.params.semesterId,
    req.body,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semester updated successfully',
    data: result,
  });
});

export const academicSemesterController = {
  createAcademicSemester,
  getAcademicSemesters,
  getAcademicSemesterById,
  updateAcademicSemesterById,
};
