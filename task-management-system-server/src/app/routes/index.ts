import express from 'express';

import { TaskRoutes } from '../Modules/Task/Task.routes';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/tasks',
    route: TaskRoutes,
  },
  
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
