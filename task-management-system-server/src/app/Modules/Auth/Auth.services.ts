import AppError from '../../errors/AppError';
import {  authSearchableField } from './Auth.constant';
import { TAuth } from './Auth.interface';
import { AuthModel} from './Auth.model';
import {
  createToken,
} from './Auth.utils';
import QueryBuilder from '../../builder/QueryBuilder';


import config from '../../config';

const authAccountIntoDB = async (email: string, payload: TAuth) => {
  const auth = await AuthModel.isAuthExistByEmail(email);

  if (auth) {
    return auth;
  }

  const authData = await AuthModel.create(payload);
  return authData;
};
const updateAuthIntoDB = async (id: string, payload: Partial<TAuth>) => {
  const updateAuthInfo = await AuthModel.findByIdAndUpdate(id, payload, {
    new: true,
  });
  if (!updateAuthInfo) {
    throw new AppError(400, 'Failed to update Auth');
  }
  return updateAuthInfo;
};
const getAllAuthsFromDB = async (query: Record<string, unknown>) => {
  const authQuery = new QueryBuilder(AuthModel.find(), query)
    .search(authSearchableField)
    .sortAndOrder()
    
    .filter();
  const result = authQuery.modelQuery;

  return result;
};



const deleteAuthFromDB = async (id: string) => {
  const deleteAuthInfo = await AuthModel.findByIdAndDelete(id);
  return deleteAuthInfo;
};





const createJwtToken = async (payload: { email: string }) => {
  const { email } = payload;
  const auth = await AuthModel.isAuthExistByEmail(email);

  const jwtPayload = {
    
    email: auth.email,
    role: auth.role || '',
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  return {
    token: accessToken,
    role: auth.role,
   
  };
};

export const AuthServices = {
  authAccountIntoDB,
  updateAuthIntoDB,
  getAllAuthsFromDB,
  deleteAuthFromDB,

  createJwtToken,

};
