import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { User } from './user.model';

export const findLastStudentId = async () => {
  const lastStudent = await User.findOne(
    { role: 'student' },
    {
      id: 1,
      _id: 0,
    },
    { sort: { createdAt: -1 } },
  ).lean();
  // return lastStudent?.id ? lastStudent.id.substring(6) : undefined;
  return lastStudent?.id ? lastStudent.id : undefined;
};

export const generateFirstStudentId = async (payload: TAcademicSemester) => {
  //   const currentId = (0).toString.padStart(4, '0');
  console.log('last Student Id', await findLastStudentId());
  //![some bugs remaining] let currentId = (await findLastStudentId()) || (0).toString();
  let currentId = (0).toString();
  const lastStudentId = await findLastStudentId(); // 2025020001
  if (lastStudentId) {
    const lastStudentAcademicYear = lastStudentId.substring(0, 4);
    const lastStudentAcademicSemesterCode = lastStudentId.substring(4, 6);
    const lastStudentSerialNumber = lastStudentId.substring(6);
    const currentYear = payload.year;
    const currentCode = payload.code;
    if (
      lastStudentId &&
      lastStudentAcademicSemesterCode === currentCode &&
      lastStudentAcademicYear === currentYear
    ) {
      currentId = lastStudentSerialNumber;
    }
  }
  let increment = (Number(currentId) + 1).toString().padStart(4, '0');
  increment = `${payload.year}${payload.code}${increment}`;
  return increment;
};
