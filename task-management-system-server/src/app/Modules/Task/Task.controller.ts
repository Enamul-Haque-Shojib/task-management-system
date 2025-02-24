import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { TaskModel } from './Task.model';
import { TaskServices } from './Task.services';


const createTask = catchAsync(async (req, res) => {
  const result = await TaskServices.createTaskIntoDB(req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Task successfully created',
    data: result,
  });
});

const updateTask = catchAsync(async (req, res) => {
  const result = await TaskServices.updateTaskIntoDB(
    req.params.id,
    req.body,
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Task successfully updated',
    data: result,
  });
});

const getSingleTask = catchAsync(async (req, res) => {
  const result = await TaskServices.getSingleTaskFromDB(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Single Task successfully retrieved',
    data: result,
  });
});
const getAllTasks = catchAsync(async (req, res) => {
  const result = await TaskServices.getAllTasksFromDB(req.query);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Tasks successfully retrieved',
    data: result,
  });
});

const deleteSingleTask = catchAsync(async (req, res) => {
  const result = await TaskServices.deleteSingleTaskFromDB(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Task successfully deleted',
    data: result,
  });
});

const dashboardStatistics = catchAsync(async (req, res) => {
  const result = await TaskServices.dashboardStatisticsFromDB();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'successfully calculated for dashboard statistics',
    data: result,
  });
});

export const TaskControllers = {
  createTask,
  updateTask,
  getAllTasks,
  deleteSingleTask,
  getSingleTask,
  dashboardStatistics
};
