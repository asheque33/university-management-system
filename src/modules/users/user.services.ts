import mongoose from 'mongoose';
import config from '../../config';
import { AcademicSemesterModel } from '../academicSemester/academicSemester.model';
import { TStudent } from '../students/student.interface';
import { Student } from '../students/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './user.utils';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  // create a user empty object
  const userData: Partial<TUser> = {};

  //if password is not given , use deafult password
  userData.password = password || (config.default_password as string);

  //set student role
  userData.role = 'student';
  // find academic semester info
  const admissionSemester = await AcademicSemesterModel.findById(
    payload.academicSemester,
  );
  // ! Transaction-Rollback Applied[2/more database write korar khetre use kora hoy]
  const session = await mongoose.startSession();
  // create a user
  try {
    session.startTransaction(); // Transaction-1
    //set manually generated it
    if (admissionSemester) {
      userData.id = await generateStudentId(admissionSemester);
    }
    const newUser = await User.create([userData], { session });
    //! transaction-rollback apply korle data array form e create hoy, normally object form e thake
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create User.');
    }
    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id
    // create a student
    const newStudent = await Student.create([payload], { session }); //! built-in static method
    // const studentInstance = new Student([payload],{session});// Transaction-2
    // const newStudent = await studentInstance.save(); //! built-in instance method
    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create Student.');
    }
    await session.commitTransaction();
    await session.endSession();
    return newStudent;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Failed to create both User and Student.',
    );
  }
};

export const UserServices = {
  createStudentIntoDB,
};
