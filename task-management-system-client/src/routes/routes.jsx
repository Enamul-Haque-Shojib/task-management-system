
import {
    createBrowserRouter,
} from "react-router-dom";
import Register from "../pages/register/Register";
import Login from "../pages/login/Login";

import DashboardRoot from "../root/DashboardRoot";
import { routeGenerator } from "../utils/routeGenerator";
import { adminPaths } from "./admin.routes";
import { userPaths } from "./user.routes";
import ProtectedRoutes from "./ProtectedRoutes";




export const router = createBrowserRouter([
    

    {
      path: '/register',
      element: <Register></Register>
    },
    {
      path: '/',
      element: <Login></Login>
    },
    
    {
      path: '/Admin',
      element: (
        <ProtectedRoutes>
          <DashboardRoot />
        </ProtectedRoutes>
      ),
      children: routeGenerator(adminPaths),
    },
    {
      path: '/User',
      element: (
        <ProtectedRoutes>
          <DashboardRoot />
        </ProtectedRoutes>
      ),
      children: routeGenerator(userPaths),
    },
  ]);