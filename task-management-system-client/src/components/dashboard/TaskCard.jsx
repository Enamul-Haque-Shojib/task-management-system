


import { EditOutlined, ExpandOutlined, DeleteOutlined, UserOutlined, QuestionCircleOutlined, CheckOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { Avatar, Button, Card, message, Popconfirm, Tag, Tooltip, Row, Col } from 'antd';
import { useState } from 'react';
import { useDeleteTaskMutation, useUpdateTaskMutation } from '../../redux/admin/adminApi';
import EditTaskModal from './modal/EditTaskModal';
import DetailsTaskModel from './modal/DetailsTaskModel';
import useAuth from '../../hooks/useAuth';

const { Meta } = Card;

const TaskCard = ({ task }) => {
  const { role, user } = useAuth();
  const [updateTask] = useUpdateTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();
  
  const { _id, title, description, category, auth, createdAt } = task;
  const cardEmail = auth?.email;

  const [isDetailsTaskModalOpen, setIsDetailsTaskModalOpen] = useState(false);
  const [isEditTaskModalOpen, setIsEditTaskModalOpen] = useState(false);

  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id);
      message.success('Task deleted successfully');
    } catch (err) {
      message.error('Failed to delete task');
    }
  };

  const handleCategory = async (id, catg) => {
    try {
      await updateTask({ _id, taskInfo: { category: catg } }).unwrap();
      message.success(`Task moved to ${catg}`, 2);
    } catch (err) {
      message.error('Something went wrong', 2);
    }
  };

  const actionList = role === "Admin" ? [
    <Tooltip title='Details' key="fullscreen">
    <ExpandOutlined  onClick={() => setIsDetailsTaskModalOpen(true)} />
    </Tooltip>,
    <Tooltip title="Edit" key="edit">
    <Button disabled={category==='Done'} onClick={() => setIsEditTaskModalOpen(true)} type="text"><EditOutlined /></Button>
    </Tooltip>,
    <Tooltip title="Delete" key="delete">
    <Popconfirm
      
      title="Delete the task"
      description="Are you sure to delete this task?"
      onConfirm={() => handleDeleteTask(_id)}
      okText="Yes"
      cancelText="No"
      icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
    >
      <Button disabled={category==='In Progress'} type="text" danger><DeleteOutlined /></Button>
    </Popconfirm>
    </Tooltip>
  ] : role === "User" ? [
    <Tooltip title="Details" key="fullscreen">
    <ExpandOutlined  onClick={() => setIsDetailsTaskModalOpen(true)} />
    </Tooltip>,
    cardEmail === user.email &&<Tooltip title="Start" key="start"> <Button  disabled={category === "In Progress" || category === 'Done'} type="text" onClick={() => handleCategory(_id, 'In Progress')}><ArrowRightOutlined /></Button>
    </Tooltip>,
    cardEmail === user.email && <Tooltip title='Complete' key="complete"> <Button  disabled={category === "Done" || category === 'To Do'} type="text" onClick={() => handleCategory(_id, "Done")}><CheckOutlined /></Button>
    </Tooltip>
  ] : [];

  return (
    <Card
      style={{ width: '100%', maxWidth: 350, margin: 'auto' }}
      actions={actionList}
      hoverable
    >
      <Meta 
        title={title} 
        style={{height: 100, width: '100%'}}
        description={description.length > 100 ? `${description.slice(0, 100)}...` : description} 
      />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px' }}>
        <Tag color="purple">{new Date(createdAt).toLocaleDateString()}</Tag>
        <Tag color={category === 'To Do' ? 'blue' : category === 'In Progress' ? 'orange' : 'green'}>{category}</Tag>
        <Tooltip title={auth?.authName}>
          <Avatar src={auth?.authImgUrl} icon={<UserOutlined />} />
        </Tooltip>
      </div>
      <DetailsTaskModel open={isDetailsTaskModalOpen} onOk={() => setIsDetailsTaskModalOpen(false)} onCancel={() => setIsDetailsTaskModalOpen(false)} id={_id} />
      <EditTaskModal open={isEditTaskModalOpen} onOk={() => setIsEditTaskModalOpen(false)} onCancel={() => setIsEditTaskModalOpen(false)} id={_id} />
    </Card>
  );
};

export default TaskCard;
