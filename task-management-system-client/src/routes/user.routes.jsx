
import AllTasks from "../pages/admin/AllTasks";
import TeamMember from "../pages/admin/TeamMember";
import MyTasks from "../pages/user/MyTasks";
import UserDashboard from "../pages/user/UserDashboard";


export const userPaths = [
    {
      name: 'Dashboard',
      path: 'dashboard',
      element: <UserDashboard />,
    },
    {
      name: 'All Tasks',
      path: 'all-tasks',
      element: <AllTasks />,
    },
    {
      name: 'My Tasks',
      path: 'my-tasks',
      element: <MyTasks />,
    },
    {
      name: 'Team Members',
      path: 'team-members',
      element: <TeamMember />,
    },
  
  ];