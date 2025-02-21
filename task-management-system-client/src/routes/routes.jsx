
import {
    createBrowserRouter,
} from "react-router-dom";
import Register from "../pages/register/Register";
import Login from "../pages/login/Login";
// import ProtectedRoutes from "../layout/ProtectedRoutes";
import DashboardRoot from "../root/DashboardRoot";
import { routeGenerator } from "../utils/routeGenerator";
import { adminPaths } from "./admin.routes";
import { userPaths } from "./user.routes";




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
      path: '/admin',
      element: (
        // <ProtectedRoutes role="admin">
          <DashboardRoot />
        //  </ProtectedRoutes>
      ),
      children: routeGenerator(adminPaths),
    },
    {
      path: '/user',
      element: (
        // <ProtectedRoutes role="user">
          <DashboardRoot />
        //  </ProtectedRoutes>
      ),
      children: routeGenerator(userPaths),
    },
  ]);