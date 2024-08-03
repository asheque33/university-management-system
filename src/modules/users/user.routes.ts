import { UserControllers } from './user.controller';
import { createStudentValidationSchema } from '../students/student.validation';
import { Router } from 'express';
import { validateRequest } from '../../middlewares/validateRequest';

const router = Router();

router.post(
  '/create-student',
  validateRequest(createStudentValidationSchema),
  UserControllers.createStudent,
);

export const UserRoutes = router;
