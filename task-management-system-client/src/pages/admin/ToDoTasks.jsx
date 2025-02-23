import { Col, Row } from "antd";
import TaskCard from "../../components/dashboard/TaskCard";
import LoadingCard from "../../components/dashboard/loading/LoadingCard";
import { useGetAllQueryTasksQuery } from "../../redux/task/taskApi";

const ToDoTasks = () => {
    const { data: taskData, isLoading} = useGetAllQueryTasksQuery('To Do');
   
    if (isLoading) {
        return (
            <div>
                <LoadingCard title='To Do Tasks' isLoading></LoadingCard> 
            </div>
     
        );
    }


    return (
        <div>
            
            <h1>To Do Task</h1>
            
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

export default ToDoTasks;