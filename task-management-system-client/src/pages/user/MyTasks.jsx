import React from 'react';
import LoadingCard from '../../components/dashboard/loading/LoadingCard';
import { Col, Row } from 'antd';
import TaskCard from '../../components/dashboard/TaskCard';
import { useGetEmailQueryTasksQuery } from '../../redux/task/taskApi';
import useAuth from '../../hooks/useAuth';

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
        <div>
            
            <h1>My Tasks</h1>
            
            <Row gutter={{ xs: 4, sm: 16, md: 24, lg: 32 }}>
            {
                taskData?.data?.map((task) => (
                    <Col key={task._id} className="gutter-row" span={6}>
                    <TaskCard
                     isLoading={isLoading}
                     task={task}
                     ></TaskCard>
                     </Col>
                ))
            }
              </Row>
             
        </div>
    );
};

export default MyTasks;