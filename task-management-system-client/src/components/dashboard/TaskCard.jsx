/* eslint-disable no-unused-vars */

import { EditOutlined, FullscreenOutlined,DeleteOutlined, UserOutlined, AntDesignOutlined, QuestionCircleOutlined, SyncOutlined } from '@ant-design/icons';
import { Avatar, Button, Card, message, Popconfirm, Tag, Tooltip } from 'antd';
const { Meta } = Card;
import { useState } from 'react';
import { Modal } from 'antd';
import { useDeleteTaskMutation } from '../../redux/admin/adminApi';

const TaskCard = ({task}) => {

  const [deleteTask] = useDeleteTaskMutation();

    const {_id,title, description, category, auth, createdAt} = task;

    const [isDetailsTaskModalOpen, setIsDetailsTaskModalOpen] = useState(false);
    const [isEditTaskModalOpen, setIsEditTaskModalOpen] = useState(false);

    const handleDeleteTask=async(id)=>{
      try {
        await deleteTask(id);
        message.success('Product deleted successfully');
    } catch (err) {
        message.error('Failed to delete product');
    }
    }

  const detailsTaskModal = () => {
    setIsDetailsTaskModalOpen(true);
  };

  const detailsTaskOk = () => {
    setIsDetailsTaskModalOpen(false);
  };

  const detailsTaskCancel = () => {
    setIsDetailsTaskModalOpen(false);
  };


  const editTaskModal = () => {
    setIsEditTaskModalOpen(true);
  };

  const editTaskOk = () => {
    setIsEditTaskModalOpen(false);
  };

  const editTaskCancel = () => {
    setIsEditTaskModalOpen(false);
  };



    return (
        <div>
            <Card
        style={{
          width: 300,
        }}
       
        actions={[
          <FullscreenOutlined  key="fullscreen" type="primary" onClick={detailsTaskModal}/>,
          // <EditOutlined key="edit" type="primary" onClick={editTaskModal}/>,
          <Button  onClick={editTaskModal}   style={{border:'0'}}  key="edit"><EditOutlined  /></Button>,
          <Popconfirm
          key="delete"
          title="Delete the task"
          description="Are you sure to delete this task?"
          icon={
            <QuestionCircleOutlined
              style={{
                color: 'red',
              }}
              // okButtonProps={{
              //   loading: confirmLoading,
              // }}
              // onConfirm={()=>handleDeleteTask(_id)}
             
              // okText="Yes"
              // cancelText="No"
            />
          }
        >
          <Button onClick={()=>handleDeleteTask(_id)} danger style={{border:'0'}}  key="delete"><DeleteOutlined  /></Button>
        </Popconfirm>
        ]}
      >
        <Meta 
        style={{
            height: 100,
          }}
        //   avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
          title={title}
          description={description.length>100 ? `${description.slice(0,100)}...` : description}
        />
        <div style={{display:'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px'}}>
        <Tag bordered={false} color="purple">
        {new Date(createdAt).toLocaleDateString()}
      </Tag>
          {
            category==='To Do' && <Tag bordered={false} color="blue">
            To Do
          </Tag>
          }
          {
            category==='In Progress' && <Tag bordered={false} color="warning">
            In Progress
          </Tag>
          }
          {
            category==='Done' && <Tag bordered={false} color="success">
            Complete
          </Tag>
          }
        
        
      
        <Avatar.Group>
      <Tooltip title={auth?.authName} placement="top">
        <Avatar src={auth?.authImgUrl}  style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
      </Tooltip>
    </Avatar.Group>
        </div>
        
      </Card>




      <Modal title="Details Task" open={isDetailsTaskModalOpen} onOk={detailsTaskOk} onCancel={detailsTaskCancel}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
      <Modal title="Edit Task" open={isEditTaskModalOpen} onOk={editTaskOk} onCancel={editTaskCancel}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
        </div>
    );
};

export default TaskCard;