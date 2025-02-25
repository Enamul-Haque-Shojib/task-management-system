




import express from 'express';
import validateRequest from '../../middlewares/validateRequest';

import { TaskControllers } from "./Task.controller";
import { taskValidationSchema } from "./Task.validation";


const router = express.Router();

router.post(
  '/create-task',
 
  validateRequest(taskValidationSchema.createTaskValidationSchema),
  TaskControllers.createTask,
);
router.patch(
  '/update-task/:id',
 
  validateRequest(taskValidationSchema.updateTaskValidationSchema),
  TaskControllers.updateTask,
);
router.get(
  '/',
  TaskControllers.getAllTasks,
);
router.get('/one-task/:id', TaskControllers.getSingleTask);
router.delete('/delete-task/:id', TaskControllers.deleteSingleTask);

router.get(
  '/dashboard-auth',

  TaskControllers.dashboardStatistics,
);

export const TaskRoutes = router;

