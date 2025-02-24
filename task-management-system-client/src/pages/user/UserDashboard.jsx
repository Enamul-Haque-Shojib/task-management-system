
import { Card, Avatar, Typography, Row, Col } from "antd";
import Chart from "react-apexcharts";
import useAuth from "../../hooks/useAuth";
import { useStaticsTasksQuery } from "../../redux/task/taskApi";



const { Title, Text } = Typography;

const UserDashboard = () => {
  const {user, role} = useAuth();

  const {data:staticsTask, isLoading} = useStaticsTasksQuery();

  
      const pieChartOptions = {
          labels: ["To Do", "In Progress", "Complete"],
        };
        const pieChartSeries = [staticsTask?.data?.Todo||0,staticsTask?.data?.inProgress||0,staticsTask?.data?.complete||0];
  
    return (
      <Row gutter={[16, 16]} style={{ padding: 24 }}>
        {/* Profile Section */}
        <Col xs={24} sm={12} md={8}>
          <Card>
            <Row align="middle">
              <Avatar size={64} src={user?.photoURL} />
              <Col style={{ marginLeft: 16 }}>
                <Title level={4}>{user?.displayName}</Title>
                <Text type="secondary">{user?.email}</Text>
                <br />
                <Text type="secondary">Role: {role}</Text>
              </Col>
            </Row>
          </Card>
        </Col>
  
        {/* Pie Chart */}
        <Col xs={24} sm={12} md={16}>
          <Card>
          <Chart options={pieChartOptions} series={pieChartSeries} type="pie" height={250} />
          </Card>
        </Col>
  
        {/* Summary Cards */}
        <Col xs={24}>
          <Card>
            <Row justify="space-around" gutter={[16, 16]}>
         
                <Col span={6} style={{ textAlign: "center" }}>
                  <Title level={3}>{staticsTask?.data?.Todo||0}</Title>
                  <Text>To Do</Text>
                </Col>
                <Col span={6} style={{ textAlign: "center" }}>
                  <Title level={3}>{staticsTask?.data?.inProgress||0}</Title>
                  <Text>In Progress</Text>
                </Col>
                <Col span={6} style={{ textAlign: "center" }}>
                  <Title level={3}>{staticsTask?.data?.complete||0}</Title>
                  <Text>Complete</Text>
                </Col>
            
            </Row>
          </Card>
        </Col>
      
      </Row>
    );
};

export default UserDashboard;