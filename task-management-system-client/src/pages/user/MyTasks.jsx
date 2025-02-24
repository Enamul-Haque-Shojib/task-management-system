import React from 'react';
import LoadingCard from '../../components/dashboard/loading/LoadingCard';
import { Col, Empty, Row, Typography } from 'antd';
import TaskCard from '../../components/dashboard/TaskCard';
import { useGetEmailQueryTasksQuery } from '../../redux/task/taskApi';
import useAuth from '../../hooks/useAuth';
const { Title } = Typography;
const MyTasks = () => {
    const {user} = useAuth()
    
    const { data: taskData, isLoading, refetch } = useGetEmailQueryTasksQuery(user?.email);

    // useEffect(() => {
    //     const handleTaskUpdate = () => {
    //       refetch();
    //     };
      
    //     socket.on("taskUpdated", handleTaskUpdate);
      
    //     return () => {
    //       socket.off("taskUpdated", handleTaskUpdate);
    //     };
    //   }, [refetch]);

   
    if (isLoading) {
        return (
            <div>
                <LoadingCard title='My Tasks' isLoading></LoadingCard> 
            </div>
     
        );
    }

    return (
        <div style={{ padding: '20px' }}>
      <Title level={2} style={{ textAlign: 'center', marginBottom: '24px' }}>My Tasks</Title>
      {
        taskData?.data?.length == 0 ? 
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        :
        <Row gutter={[16, 16]} justify="start">
        {taskData?.data?.map((task) => (
          <Col key={task._id} xs={24} sm={16} md={12} lg={12} xl={8}>
            <TaskCard task={task} />
          </Col>
        ))}
      </Row>
      }
      
    </div>
    );
};

export default MyTasks;