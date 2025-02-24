import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { authValidationSchema } from './Auth.validation';
import { AuthControllers } from './Auth.controllers';


const router = express.Router();

router.post(
  '/account/:email',
  validateRequest(authValidationSchema.authRegisterValidationSchema),
  AuthControllers.authAccount,
);

router.patch(
  '/update-auth/:id',
  
  validateRequest(authValidationSchema.updateAuthInfoValidationSchema),
  AuthControllers.updateAuth,
);
router.get(
  '/one-auth/:email',

  AuthControllers.getAllAuths,
);
router.get(
  '/',

  AuthControllers.getAllAuths,
);

router.delete(
  '/delete-auth/:id',

  AuthControllers.deleteSingleAuth,
);



router.post('/jwt', AuthControllers.jwtToken);

export const AuthRoutes = router;
