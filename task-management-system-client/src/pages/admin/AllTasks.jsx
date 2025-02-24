// import TaskCard from "../../components/dashboard/TaskCard";
// import { useGetAllTasksQuery } from "../../redux/task/taskApi";

// import React, { useState } from 'react';
// import { Card, Col,Row } from 'antd';
// import LoadingCard from "../../components/dashboard/loading/LoadingCard";

// const style = { background: '#0092ff', padding: '8px 0' };

// // import { useEffect } from "react";
// // import { io } from "socket.io-client";
// // // const socket = io("http://localhost:5000");

// const AllTasks = () => {


//     const { data: taskData, isLoading, refetch } = useGetAllTasksQuery(undefined);

//     // useEffect(() => {
//     //     const handleTaskUpdate = () => {
//     //       refetch();
//     //     };
      
//     //     socket.on("taskUpdated", handleTaskUpdate);
      
//     //     return () => {
//     //       socket.off("taskUpdated", handleTaskUpdate);
//     //     };
//     //   }, [refetch]);

   
//     if (isLoading) {
//         return (
//             <div>
//                 <LoadingCard title='All Tasks' isLoading></LoadingCard> 
//             </div>
     
//         );
//     }








//     return (
//         <div>
            
//             <h1>All Tasks</h1>
            
//             <Row gutter={{ xs: 4, sm: 16, md: 24, lg: 32 }}>
//             {
//                 taskData?.data?.map((task) => (
//                     <Col key={task._id} className="gutter-row" span={6}>
//                     <TaskCard
//                      isLoading={isLoading}
//                      task={task}
//                      ></TaskCard>
//                      </Col>
//                 ))
//             }
//               </Row>
             
//         </div>
//     );
// };

// export default AllTasks;

import TaskCard from "../../components/dashboard/TaskCard";
import { useGetAllTasksQuery } from "../../redux/task/taskApi";
import { Row, Col, Typography, Empty } from 'antd';
import LoadingCard from "../../components/dashboard/loading/LoadingCard";

const { Title } = Typography;

const AllTasks = () => {
  const { data: taskData, isLoading } = useGetAllTasksQuery();
  
  if (isLoading) {
    return <LoadingCard title='All Tasks' isLoading />;
  }

  return (
    <div style={{ padding: '20px' }}>
      <Title level={2} style={{ textAlign: 'center', marginBottom: '24px' }}>All Tasks</Title>
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

export default AllTasks;
