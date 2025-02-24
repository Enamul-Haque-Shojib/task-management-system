import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AuthServices } from './Auth.services';

const authAccount = catchAsync(async (req, res) => {
  
  const authData = await AuthServices.authAccountIntoDB(
    req.params.email,
    req.body,
  );

  const tokenData = await AuthServices.createJwtToken({
    email: authData.email,
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Auth registration successfully',
    data: { tokenData },
  });
});

const updateAuth = catchAsync(async (req, res) => {
 
  const result = await AuthServices.updateAuthIntoDB(req.params.id, req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Auth updated successfully',
    data: result,
  });
});

const getSingleAuth = catchAsync(async (req, res) => {
  const result = await AuthServices.getSingleAuthFromDB(req.params.email);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Auth retrieved successfully',
    data: result,
  });
});
const getAllAuths = catchAsync(async (req, res) => {
  const result = await AuthServices.getAllAuthsFromDB(req.query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Auths retrieved successfully',
    data: result,
  });
});


const deleteSingleAuth = catchAsync(async (req, res) => {
  const result = await AuthServices.deleteAuthFromDB(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Auth deleted successfully',
    data: result,
  });
});



const jwtToken = catchAsync(async (req, res) => {
  const tokenData = await AuthServices.createJwtToken(req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Access token is retrieved successfully!',
    data: { tokenData },
  });
});

export const AuthControllers = {
  authAccount,
  updateAuth,
  getAllAuths,
  getSingleAuth,
  deleteSingleAuth,

  jwtToken,

};
