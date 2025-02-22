import express from 'express';

import { TaskRoutes } from '../Modules/Task/Task.routes';
import { AuthRoutes } from '../Modules/Auth/Auth.routes';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/auths',
    route: AuthRoutes,
  },
  
  {
    path: '/tasks',
    route: TaskRoutes,
  },
  
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
