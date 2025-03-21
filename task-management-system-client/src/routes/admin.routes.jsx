
import AdminDashboard from "../pages/admin/AdminDashboard";
import AllTasks from "../pages/admin/AllTasks";
import DoneTasks from "../pages/admin/DoneTasks";
import InProgressTasks from "../pages/admin/InProgressTasks";
import TeamMember from "../pages/admin/TeamMember";
import ToDoTasks from "../pages/admin/ToDoTasks";





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
    {
      name: 'Team Members',
      path: 'team-members',
      element: <TeamMember />,
    },
  
  ];