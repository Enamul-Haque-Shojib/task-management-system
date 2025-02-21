import { model, Schema } from 'mongoose';

import { category } from './Task.constant';
import { TaskStaticModel, TTask } from './Task.interface';

const taskSchema = new Schema<TTask, TaskStaticModel>(
  {
  
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
   
    category: {
      type: String,
      enum: {
        values: category,
      },
      default: 'To Do',
    },
  },
  {
    timestamps: true,
  },
);



export const TaskModel = model<TTask, TaskStaticModel>(
  'Task',
  taskSchema,
);
