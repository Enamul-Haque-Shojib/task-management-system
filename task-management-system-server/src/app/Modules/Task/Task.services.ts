import AppError from '../../errors/AppError';
import QueryBuilder from '../../builder/QueryBuilder';
import { TTask } from './Task.interface';
import { TaskModel } from './Task.model';
import { taskSearchableField } from './Task.constant';
import { AuthModel } from '../Auth/Auth.model';

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



// const getAllTasksFromDB = async (query: Record<string, unknown>) => {
//   const taskQuery = new QueryBuilder(TaskModel.find().populate('auth'), query)
//   .search(taskSearchableField)
//     .filter();
//   const result = await taskQuery.modelQuery; // **Add `await` to execute query**

//   return result;
// };

const getAllTasksFromDB = async (query: Record<string, unknown>) => {
  // const taskQuery = TaskModel.find();

  // If email filter is present, populate `auth` and filter
  if (query.email) {
    const taskQuery = TaskModel.find();
    taskQuery.populate({
      path: "auth",
      match: { email: query.email as string }, // Match email only if provided
    });
    const result = await taskQuery.lean(); 
    return result.filter((task) => task.auth !== null);
  } else {
    const taskQuery = new QueryBuilder(TaskModel.find().populate("auth"), query)
    .search(taskSearchableField)
    .sortAndOrder()
    .filter();
  const result = taskQuery.modelQuery;
  return result;
    // taskQuery.populate("auth"); // Populate `auth` for all tasks
  }

  // const result = await taskQuery.lean(); // Convert to plain JSON
  // return result.filter((task) => task.auth !== null); // Remove null auth when filtering
};



const getSingleTaskFromDB = async (id: string) => {
  const deleteTaskInfo = await TaskModel.findById(id).populate('auth');
  return deleteTaskInfo;
};


const deleteSingleTaskFromDB = async (id: string) => {
  const deleteTaskInfo = await TaskModel.findByIdAndDelete(id);
  return deleteTaskInfo;
};


const dashboardStatisticsFromDB = async () => {
  

    const taskData = await TaskModel.find(); 

  
    let todo = 0;
    let inprogress = 0;
    let complete = 0;
    taskData.forEach((task) => {
      if(task.category === 'To Do'){
        todo ++;
      }else if(task.category === 'In Progress'){
        inprogress++;
      }else if(task.category === 'Done'){
        complete ++;
      }
    })
  

    return {todo, inprogress, complete}

};


export const TaskServices = {
  createTaskIntoDB,
  updateTaskIntoDB,
  getAllTasksFromDB,
  deleteSingleTaskFromDB,
  getSingleTaskFromDB,
  dashboardStatisticsFromDB
};
