import httpStatus from 'http-status';
import { StudentServices } from './student.services';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';

const getSingleStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await StudentServices.getSingleStudentFromDB(studentId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is retrieved successfully',
    data: result,
  });
});

const getAllStudents = catchAsync(async (req, res) => {
  const result = await StudentServices.getAllStudentsFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student are retrieved successfully',
    data: result,
  });
});

const updateStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await StudentServices.updateSingleStudentFromDB(
    studentId,
    req.body,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is updated successfully',
    data: result,
  });
});
const deleteStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await StudentServices.deleteStudentFromDB(studentId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is deleted successfully',
    data: result,
  });
});

export const StudentControllers = {
  getAllStudents,
  getSingleStudent,
  updateStudent,
  deleteStudent,
};
