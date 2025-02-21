/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export type TTask = {
  title: string;
  description: string;
 
  category: 'To Do' | 'In Progress' | 'Done' ;
};

export interface TaskStaticModel extends Model<TTask> {
  isParcelExistById(id: string): Promise<TTask>;
}
