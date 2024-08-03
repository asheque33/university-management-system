import { Router } from 'express';
import { UserRoutes } from '../modules/users/user.routes';
import { StudentRoutes } from '../modules/students/student.routes';
import { academicSemesterRoutes } from '../modules/academicSemester/academicSemester.routes';

const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    handler: UserRoutes,
  },
  {
    path: '/students',
    handler: StudentRoutes,
  },
  {
    path: '/academic-semesters',
    handler: academicSemesterRoutes,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.handler);
});
export default router;
