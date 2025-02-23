import { Col, Row } from "antd";
import TaskCard from "../../components/dashboard/TaskCard";
import LoadingCard from "../../components/dashboard/loading/LoadingCard";
import { useGetAllQueryTasksQuery } from "../../redux/task/taskApi";


const DoneTasks = () => {
    const { data: taskData, isLoading} = useGetAllQueryTasksQuery('Done');

   
    if (isLoading) {
        return (
            <div>
                <LoadingCard title='Complete Tasks' isLoading></LoadingCard> 
            </div>
     
        );
    }


    return (
        <div>
            
            <h1>Complete Task</h1>
            
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

export default DoneTasks;