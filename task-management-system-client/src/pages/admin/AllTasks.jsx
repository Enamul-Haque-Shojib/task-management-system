

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
