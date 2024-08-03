import { TAcademicSemester } from './academicSemester.interface';
import { AcademicSemesterModel } from './academicSemester.model';

const createAcademicSemesterIntoDB = (payload: TAcademicSemester) => {
  const result = AcademicSemesterModel.create(payload);
  return result;
};
const getAcademicSemestersFromDB = () => {
  const result = AcademicSemesterModel.find({});
  return result;
};
export const academicSemesterServices = {
  createAcademicSemesterIntoDB,
  getAcademicSemestersFromDB,
};
