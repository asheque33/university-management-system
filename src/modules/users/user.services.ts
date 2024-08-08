import config from '../../config';
import { AcademicSemesterModel } from '../academicSemester/academicSemester.model';
import { TStudent } from '../students/student.interface';
import { Student } from '../students/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generateFirstStudentId } from './user.utils';

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given , use deafult password
  userData.password = password || (config.default_password as string);

  //set student role
  userData.role = 'student';
  // find academic semester info
  const admissionSemester = await AcademicSemesterModel.findById(
    payload.academicSemester,
  );
  //set manually generated it
  if (admissionSemester) {
    userData.id = await generateFirstStudentId(admissionSemester);
  }

  // create a user
  const newUser = await User.create(userData);

  //create a student
  if (Object.keys(newUser).length) {
    // set id , _id as user
    payload.id = newUser.id;
    payload.user = newUser._id; //reference _id

    // const newStudent = await Student.create(payload);  //! built-in static method
    const studentInstance = new Student(payload);
    const newStudent = await studentInstance.save(); //! built-in instance method

    return newStudent;
  }
};

export const UserServices = {
  createStudentIntoDB,
};
