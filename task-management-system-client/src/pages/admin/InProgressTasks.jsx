import { Col, Empty, Row, Typography } from "antd";
import TaskCard from "../../components/dashboard/TaskCard";
import LoadingCard from "../../components/dashboard/loading/LoadingCard";
import { useGetAllQueryTasksQuery } from "../../redux/task/taskApi";
const { Title } = Typography;

const InProgressTasks = () => {
    const { data: taskData, isLoading} = useGetAllQueryTasksQuery('In Progress');

   
    if (isLoading) {
        return (
            <div>
                <LoadingCard title='In Progress Tasks' isLoading></LoadingCard> 
            </div>
     
        );
    }


    return (
        <div style={{ padding: '20px' }}>
      <Title level={2} style={{ textAlign: 'center', marginBottom: '24px' }}>In Progress Tasks</Title>
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

export default InProgressTasks;