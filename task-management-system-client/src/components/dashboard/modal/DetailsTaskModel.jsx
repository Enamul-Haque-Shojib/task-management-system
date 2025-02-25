

import { Avatar, Card, Modal, Spin, Tag, Typography, Divider, Row, Col, Space } from 'antd';
import { useGetSingleTasksQuery } from '../../../redux/task/taskApi';
import { UserOutlined, CalendarOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const categoryColors = {
    "To Do": "blue",
    "In Progress": "orange",
    "Done": "green",
};

const DetailsTaskModel = ({ open, onOk, onCancel, id }) => {
    const { data, isLoading } = useGetSingleTasksQuery(id);
    const task = data?.data;

    return (
        <Modal
            title={<Title level={3} style={{ textAlign: 'center', marginBottom: 0 }}>Task Details</Title>}
            open={open}
            onCancel={onCancel}
            footer={null}
            width={600} // Adjusted modal width
            centered
        >
            {isLoading ? (
                <div style={{ textAlign: 'center', padding: "50px 0" }}>
                    <Spin size="large" />
                </div>
            ) : (
                <>
                    <Divider />
                    <Row justify="space-between" align="middle">
                        <Col>
                            <Title level={4} style={{ margin: 0 }}>{task?.title}</Title>
                        </Col>
                        <Col>
                            <Tag color="purple" icon={<CalendarOutlined />}>
                                {new Date(task?.createdAt).toLocaleDateString()}
                            </Tag>
                        </Col>
                    </Row>

                    <Text style={{ fontSize: 16, color: "#555" }}>{task?.description}</Text>

                    <Divider />

                    <Row justify="space-between" align="middle">
                        <Col>
                            <Space>
                                <Avatar src={task?.auth?.authImgUrl} size={50} icon={<UserOutlined />} />
                                <div>
                                    <Title level={5} style={{ margin: 0 }}>{task?.auth?.authName}</Title>
                                    <Text type="secondary">{task?.auth?.email}</Text>
                                </div>
                            </Space>
                        </Col>
                        <Col>
                            <Tag color={categoryColors[task?.category] || "default"} style={{ fontSize: 14 }}>
                                {task?.category}
                            </Tag>
                        </Col>
                    </Row>
                </>
            )}
        </Modal>
    );
};

export default DetailsTaskModel;
