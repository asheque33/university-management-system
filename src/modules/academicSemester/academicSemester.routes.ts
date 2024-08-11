import express from 'express';
import { academicSemesterController } from './academicSemester.controller';
import { validateRequest } from '../../middlewares/validateRequest';
import { AcademicSemesterValidations } from './academicSemester.validation';

const router = express.Router();

router.post(
  '/create-academic-semester',
  validateRequest(
    AcademicSemesterValidations.createAcademicSemesterValidationSchema,
  ),
  academicSemesterController.createAcademicSemester,
);
router.get('/', academicSemesterController.getAcademicSemesters);
router.get('/:semesterId', academicSemesterController.getAcademicSemesterById);
router.patch(
  '/:semesterId',
  validateRequest(
    AcademicSemesterValidations.updateAcademicSemesterValidationSchema,
  ),
  academicSemesterController.updateAcademicSemesterById,
);

export const academicSemesterRoutes = router;
