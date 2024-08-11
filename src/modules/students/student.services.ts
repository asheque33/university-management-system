import { TStudent } from './student.interface';
import { Student } from './student.model';

const getAllStudentsFromDB = async () => {
  const result = await Student.find();
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  // ! findOne({id:id})=> custom id dite hobe
  // ! findOne({_id:id})=> mongoDB _id dite hobe
  // ! findById(id)=> only mongoDB _id dite hobe
  // const result = await Student.aggregate([{ $match: { id } }]); //! only custom id dite hobe
  // const result = await Student.aggregate([{ $match: { id } }]);
  const result = await Student.findById(id);
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
    { _id: id },
    { $set: { ...payload } },
    { upsert: true },
  );

  return result;
};

const deleteStudentFromDB = async (id: string) => {
  const result = await Student.updateOne({ _id: id }, { isDeleted: true });
  return result;
};

export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  updateSingleStudentFromDB,
  deleteStudentFromDB,
};
