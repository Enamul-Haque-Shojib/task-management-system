import TaskCard from "../../components/dashboard/TaskCard";
import { useGetAllTasksQuery } from "../../redux/task/taskApi";

import React, { useState } from 'react';
import { Card, Col,Row } from 'antd';
import LoadingCard from "../../components/dashboard/loading/LoadingCard";

const style = { background: '#0092ff', padding: '8px 0' };

// import { useEffect } from "react";
// import { io } from "socket.io-client";
// // const socket = io("http://localhost:5000");

const AllTasks = () => {


    const { data: taskData, isLoading, refetch } = useGetAllTasksQuery(undefined);

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
                <LoadingCard title='All Tasks' isLoading></LoadingCard> 
            </div>
     
        );
    }








    return (
        <div>
            
            <h1>All Tasks</h1>
            
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

export default AllTasks;