import { TStudent } from './student.interface';
import { Student } from './student.model';
import { startSession } from 'mongoose';
import httpStatus from 'http-status';
import { User } from '../users/user.model';
import AppError from '../../errors/AppError';

const getAllStudentsFromDB = async () => {
  const result = await Student.find()
    .populate('user')
    .populate('academicSemester')
    .populate({
      path: 'academicDepartment',

      populate: {
        path: 'academicFaculty',
      },
    });
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  // ! findOne({id:id})=> custom id dite hobe
  // ! findOne({_id:id})=> mongoDB _id dite hobe
  // ! findById(id)=> only mongoDB _id dite hobe
  // const result = await Student.aggregate([{ $match: { id } }]); //! only custom id dite hobe

  const result = await Student.findOne({ _id: id })
    .populate('user')
    .populate('academicSemester')
    .populate({
      path: 'academicDepartment',

      populate: {
        path: 'academicFaculty',
      },
    });
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Student not found!');
  }
  return result;
};

const updateSingleStudentFromDB = async (
  id: string,
  payload: Partial<TStudent>,
) => {
  // ! If you want to update only specific fields without overwriting the entire document, using $set ensures that only those specific fields are modified.
  // ! updateOne({id:id})=> custom id dite hobe
  // ! updateOne({_id:id})=> mongoDB _id dite hobe
  // ! findByIdAndUpdate(id)=> only mongoDB _id dite hobe
  // const result = await Student.updateOne(
  //   { id: id },
  //   { $set: { isDeleted: true, ...payload } },
  //   { upsert: true },
  // );
  // const result = await Student.findByIdAndUpdate(
  //   id,
  //   { $set: payload },
  //   { upsert: true },
  // ); //! got some issues
  const result = await Student.updateOne(
    { id: id },
    { $set: { ...payload } },
    { upsert: true },
  );

  return result;
};
// ! user and student same person , so common password use korbe
const deleteStudentFromDB = async (id: string) => {
  const session = await startSession();
  session.startTransaction();
  try {
    const deletedStudent = await Student.findOneAndUpdate(
      { id },
      { $set: { isDeleted: true } },
      { new: true, session },
    );
    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete student');
    }
    const deletedUser = await User.findOneAndUpdate(
      { id },
      { $set: { isDeleted: true } },
      { new: true, session },
    );
    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete user');
    }
    (await session).commitTransaction();
    (await session).endSession();
    return deletedStudent;
  } catch (error) {
    (await session).abortTransaction();
    (await session).endSession();
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Failed to delete both user and student.',
    );
  }
};

export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  updateSingleStudentFromDB,
  deleteStudentFromDB,
};
