import { UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Divider, Modal, Popover, Space, Tooltip } from 'antd';
import { Layout, theme } from 'antd';
import { useState } from 'react';
import AddTaskModal from './modal/AddTaskModal';
const { Header } = Layout;
const Navbar = () => {


  const [modal, contextHolder] = Modal.useModal();

  const confirm = () => {
    modal.confirm({
      title: 'Confirm',
      icon: <ExclamationCircleOutlined />,
      content: 'Bla bla ...',
      okText: '确认',
      cancelText: '取消',
    });
  };
    
    const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
    const {
        token: { colorBgContainer },
      } = theme.useToken();

      const content = (
        <div style={{width:100}}>
          <h3>Jack Era</h3>
          <p>Admin</p>
          <p>Profile</p>
          <Divider style={{margin:0}}></Divider>
          <Button style={{border: 0, boxShadow: 'none', padding:0}} danger>Logout</Button>
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
            position: 'sticky',
            top: 0,
            zIndex: 1,
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
                <Tooltip title='Michel Jasi' placement="top">
                    <Avatar src='https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg'  style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
                </Tooltip>
                <Tooltip title='Michel Jasi' placement="top">
                    <Avatar src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQL9HaaTJSDJsT4iNusqiWXnEUelnan5lADZQ&s'  style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
                </Tooltip>
                <Tooltip title='Michel Jasi' placement="top">
                    <Avatar src='https://img.freepik.com/free-photo/lifestyle-people-emotions-casual-concept-confident-nice-smiling-asian-woman-cross-arms-chest-confident-ready-help-listening-coworkers-taking-part-conversation_1258-59335.jpg'  style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
                </Tooltip>
                <Tooltip title='Michel Jasi' placement="top">
                    <Avatar src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAe9NZZk7nUE_anJir2Scf7tsqMHRdEpCbJg&s'  style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
                </Tooltip>
                <Tooltip title='Michel Jasi' placement="top">
                    <Avatar src='https://media.istockphoto.com/id/1389348844/photo/studio-shot-of-a-beautiful-young-woman-smiling-while-standing-against-a-grey-background.jpg?s=612x612&w=0&k=20&c=anRTfD_CkOxRdyFtvsiPopOluzKbhBNEQdh4okZImQc='  style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
                </Tooltip>
                </Avatar.Group>
            </div>
            <div>
            <Button type='primary' onClick={addTaskModal}>+ Add Task</Button>
                

                <Popover  content={content} title="" trigger="click" > 
                    <Avatar src='https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg' alt='profile' size="large" icon={<UserOutlined />} style={{cursor:'pointer', marginLeft: 20}} />
                </Popover>
            </div>
             
            </div>


              <AddTaskModal open={isAddTaskModalOpen} onOk={addTaskOk} onCancel={addTaskCancel}></AddTaskModal>
      
        </Header>
    );
};

export default Navbar;