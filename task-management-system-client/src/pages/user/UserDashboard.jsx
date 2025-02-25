
import { Card, Avatar, Typography, Row, Col, Spin } from "antd";
import Chart from "react-apexcharts";
import useAuth from "../../hooks/useAuth";
import { useStaticsTasksQuery } from "../../redux/task/taskApi";

import CountUp from "react-countup";

const { Title, Text } = Typography;

const UserDashboard = () => {
  const { user, role } = useAuth();
  const { data: staticsTask, isLoading } = useStaticsTasksQuery();

  const pieChartOptions = {
    labels: ["To Do", "In Progress", "Complete"],
    legend: { position: "bottom" },
  };
  const pieChartSeries = [
    staticsTask?.data?.todo || 0,
    staticsTask?.data?.inprogress || 0,
    staticsTask?.data?.complete || 0,
  ];

  return (
    <Row gutter={[24, 24]} style={{ padding: 24 }}>

      <Col xs={24} sm={12} md={8} lg={6}>
        <Card style={{ textAlign: "center", borderRadius: 12 }}>
          <Avatar size={90} src={user?.photoURL} />
          <Title level={4} style={{ marginTop: 16 }}>{user?.displayName}</Title>
          <Text type="secondary">{user?.email}</Text>
          <br />
          <Text strong style={{ color: "#1890ff" }}>Role: {role}</Text>
        </Card>
      </Col>

     
      <Col xs={24} sm={12} md={16} lg={18}>
        <Card style={{ borderRadius: 12 }}>
          {isLoading ? (
            <Spin size="large" style={{ display: "block", margin: "auto" }} />
          ) : (
            <Chart options={pieChartOptions} series={pieChartSeries} type="pie" height={250} />
          )}
        </Card>
      </Col>


      <Col xs={24}>
        <Row gutter={[16, 16]} justify="center">
          {["Todo", "In Progress", "Complete"].map((status, index) => (
            <Col key={index} xs={24} sm={12} md={8}>
              <Card
                style={{
                  textAlign: "center",
                  borderRadius: 12,
                  backgroundColor: ["#ffcccb", "#ffff99", "#d4edda"][index],
                }}
              >
                <Title level={3}>
                  <CountUp end={staticsTask?.data?.[status.replace(" ", "").toLowerCase()] || 0} duration={2} />
                </Title>
                <Text strong>{status}</Text>
              </Card>
            </Col>
          ))}
        </Row>
      </Col>
    </Row>
  );
};

export default UserDashboard;