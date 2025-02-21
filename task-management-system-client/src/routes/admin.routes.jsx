
import AdminDashboard from "../pages/admin/AdminDashboard";
import AllTasks from "../pages/admin/AllTasks";
import DoneTasks from "../pages/admin/DoneTasks";
import InProgressTasks from "../pages/admin/InProgressTasks";
import ToDoTasks from "../pages/admin/ToDoTasks";
// import AllOrders from "../pages/admin/manageOrders/AllOrders";

// import AddProducts from "../pages/admin/manageProducts/AddProducts";
// import AllProducts from "../pages/admin/manageProducts/AllProducts";
// import UpdateProducts from "../pages/admin/manageProducts/UpdateProducts";
// import AllUsers from "../pages/admin/manageUsers/allUsers/AllUsers";




export const adminPaths = [
    {
      name: 'Dashboard',
      path: 'dashboard',
      element: <AdminDashboard />,
    },
    {
      name: 'All Tasks',
      path: 'all-tasks',
      element: <AllTasks />,
    },
    {
      name: 'To Do Tasks',
      path: 'to-do-tasks',
      element: <ToDoTasks />,
    },
    {
      name: 'In Progress Tasks',
      path: 'in-progress-tasks',
      element: <InProgressTasks />,
    },
    {
      name: 'Complete Tasks',
      path: 'done-tasks',
      element: <DoneTasks />,
    },
    // {
    //   name: 'Products Management',
    //   children: [
    //     {
    //       name: 'Add Products',
    //       path: 'add-products',
    //       element: <AddProducts />,
    //     },
    //     {
    //       path: 'update-products/:id',
    //       element: <UpdateProducts />,
    //     },
    //     {
    //       name: 'All Products',
    //       path: 'all-products',
    //       element: <AllProducts />,
    //     },
    //   ],
    // },
    // {
    //   name: 'User Management',
    //   children: [
    //     {
    //       name: 'All Users',
    //       path: 'all-users',
    //       element: <AllUsers />,
    //     },
    //   ],
    // },
    // {
    //   name: 'Order Management',
    //   children: [
    //     {
    //       name: 'All Orders',
    //       path: 'all-orders',
    //       element: <AllOrders />,
    //     },
    //   ],
    // },
  ];