import AppError from '../../errors/AppError';
import QueryBuilder from '../../builder/QueryBuilder';
import { TTask } from './Task.interface';
import { TaskModel } from './Task.model';
import { taskSearchableField } from './Task.constant';

const createTaskIntoDB = async (payload: TTask) => {
 
//   payload.parcelNumber = await generateParcelNumber();

  const result = await TaskModel.create(payload);
  return result;
};

const updateTaskIntoDB = async (id: string, payload: Partial<TTask>) => {
  const updateTaskInfo = await TaskModel.findByIdAndUpdate(id, payload, {
    new: true,
  });

  if (!updateTaskInfo) {
    throw new AppError(400, 'Failed to update Task');
  }

  return updateTaskInfo;
};



const getAllTasksFromDB = async (query: Record<string, unknown>) => {
  const parcelQuery = new QueryBuilder(TaskModel.find(), query)
    .search(taskSearchableField)
    .sortAndOrder()
    .filter();
  const result = parcelQuery.modelQuery;

  // const result = ParcelModel.find().sort('bookingDate');
  return result;
};

const getSingleTaskFromDB = async (id: string) => {
  const deleteTaskInfo = await TaskModel.findById(id);
  return deleteTaskInfo;
};
const deleteSingleTaskFromDB = async (id: string) => {
  const deleteTaskInfo = await TaskModel.findByIdAndDelete(id);
  return deleteTaskInfo;
};

export const TaskServices = {
  createTaskIntoDB,
  updateTaskIntoDB,
  getAllTasksFromDB,
  deleteSingleTaskFromDB,
  getSingleTaskFromDB,
};
