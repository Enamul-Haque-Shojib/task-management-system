// import express from "express";
// import Task from "./Task.model";


// const router = express.Router();

// // Get all tasks
// router.get("/", async (req, res) => {
//   const tasks = await Task.find();
//   res.json(tasks);
// });

// // Create a new task
// router.post("/", async (req, res) => {
//   const newTask = new Task(req.body);
//   await newTask.save();
//   res.json(newTask);
// });

// // Update task
// router.patch("/:id", async (req, res) => {
//   const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
//   res.json(updatedTask);
// });

// // Delete task
// router.delete("/:id", async (req, res) => {
//   await Task.findByIdAndDelete(req.params.id);
//   res.json({ message: "Task deleted" });
// });

// export default router;




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

