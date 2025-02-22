/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';

export type TTask = {
  title: string;
  description: string;
  auth: Types.ObjectId;
 
  category: 'To Do' | 'In Progress' | 'Done' ;
};

export interface TaskStaticModel extends Model<TTask> {
  isParcelExistById(id: string): Promise<TTask>;
}
