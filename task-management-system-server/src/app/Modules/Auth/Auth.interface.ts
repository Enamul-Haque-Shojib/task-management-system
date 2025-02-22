/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';
import { AuthRole } from './Auth.constant';



export type TAuth = {
 
  authName?: string;
  authImgUrl?: string;
  email: string;
  role?: 'Admin' | 'User';
};

export interface AuthStaticModel extends Model<TAuth> {
  isAuthExistById(id: string): Promise<TAuth>;
  isAuthExistByEmail(email: string): Promise<TAuth>;
}

export type TAuthRole = keyof typeof AuthRole;
