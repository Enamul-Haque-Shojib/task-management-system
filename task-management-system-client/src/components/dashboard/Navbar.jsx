import { UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Divider, Modal, Popover, Space, Tooltip } from 'antd';
import { Layout, theme } from 'antd';
import { useState } from 'react';
import AddTaskModal from './modal/AddTaskModal';
import useAuth from '../../hooks/useAuth';
const { Header } = Layout;
import { useNavigate, Navigate, useLocation, Link } from "react-router-dom";
import { useGetAllUsersQuery } from '../../redux/auth/authApi';
const Navbar = () => {
const navigate = useNavigate();
  const { logOut, role, user } = useAuth();

  
  const { data: userData } = useGetAllUsersQuery(user?.email);

  const handleLogOut = () => {
    logOut()
      .then(() => {
        localStorage.removeItem("ParcelManagementSystemToken");
        navigate('/')
      })
      .catch(() => {
        // Handle log out error if needed
      });
  };

 
    
    const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
    const {
        token: { colorBgContainer },
      } = theme.useToken();

      const content = (
        <div style={{width:100}}>
          <h3>{user?.displayName}</h3>
          <p>{role}</p>
          <Divider style={{margin:0}}></Divider>
          <Button 
          style={{border: 0, boxShadow: 'none', padding:0}} 
          danger
          onClick={handleLogOut}
          >
            Logout
          </Button>
        </div>
      );


      const addTaskModal = () => {
        setIsAddTaskModalOpen(true);
      };
    
      const addTaskOk = () => {
        setIsAddTaskModalOpen(false);
      };
    
      const addTaskCancel = () => {
        setIsAddTaskModalOpen(false);
      };

    return (
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: 'flex',
            justifyContent: 'end',
            alignItems: 'center',
            // position: 'sticky',
            // top: 0,
            // zIndex: 1,
            // width: '100%',
          }}
        >

            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width:'90%', margin: 'auto'}}>
          
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Avatar.Group
             max={{
                count: 3,
                style: { color: '#f56a00', backgroundColor: '#fde3cf' },
              }}
            >
             {
              userData?.data.map((member) =>(
                <Tooltip key={member._id} title={member.authName} placement="top">
                    <Avatar src={member.authImgUrl} style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
                </Tooltip>
              ))
             }
                
                </Avatar.Group>
            </div>
            <div>
              {
                role === 'Admin' && <Button type='primary' onClick={addTaskModal}>+ Add Task</Button>
              }
            
                

                <Popover  content={content} title="" trigger="click" > 
                    <Avatar src={user.photoURL} alt='profile' size="large" icon={<UserOutlined />} style={{cursor:'pointer', marginLeft: 20}} />
                </Popover>
            </div>
             
            </div>


              <AddTaskModal open={isAddTaskModalOpen} onOk={addTaskOk} onCancel={addTaskCancel}></AddTaskModal>
      
        </Header>
    );
};

export default Navbar;