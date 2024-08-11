import { academicSemesterNameCodeMapper } from './academicSemester.constant';
import { TAcademicSemester } from './academicSemester.interface';
import { AcademicSemesterModel } from './academicSemester.model';

const createAcademicSemesterIntoDB = (payload: TAcademicSemester) => {
  // create a new academic semester object from payload and save it into database.
  if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
    throw new Error('Invalid academic semester name and code combination!');
  }
  const result = AcademicSemesterModel.create(payload);
  return result;
};
const getAcademicSemestersFromDB = () => {
  const result = AcademicSemesterModel.find({});
  return result;
};
const getAcademicSemesterByIdFromDB = (_id: string) => {
  const result = AcademicSemesterModel.findById(_id);
  return result;
};

// update academic semester object with given id and save it into database.
const updateAcademicSemesterByIdInDB = (
  _id: string,
  payload: Partial<TAcademicSemester>,
) => {
  if (
    payload.name &&
    payload.code &&
    academicSemesterNameCodeMapper[payload.name] !== payload.code
  ) {
    throw new Error('Invalid academic semester name and code combination!');
  }
  const result = AcademicSemesterModel.findByIdAndUpdate(_id, payload, {
    new: true,
  });
  return result;
};

export const academicSemesterServices = {
  createAcademicSemesterIntoDB,
  getAcademicSemestersFromDB,
  getAcademicSemesterByIdFromDB,
  updateAcademicSemesterByIdInDB,
};
