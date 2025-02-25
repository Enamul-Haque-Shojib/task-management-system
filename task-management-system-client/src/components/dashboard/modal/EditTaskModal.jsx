

import { Avatar, Button, message, Modal, Typography, Spin, Space, Form, Divider, Row, Col } from "antd";
import TaskForm from "../form/TaskForm";
import TaskInput from "../form/TaskInput";
import TaskTextArea from "../form/TaskTextArea";
import TaskSelect from "../form/TaskSelect";
import { useUpdateTaskMutation } from "../../../redux/admin/adminApi";
import { useGetSingleTasksQuery } from "../../../redux/task/taskApi";
import { UserAddOutlined, UserOutlined } from "@ant-design/icons";
import { useGetAllUsersQuery } from "../../../redux/auth/authApi";
import useAuth from "../../../hooks/useAuth";
import { useState } from "react";

const { Title } = Typography;

const EditTaskModal = ({ open, onOk, onCancel, id }) => {
  const { user } = useAuth();
  const { data: userData, isLoading: usersLoading } = useGetAllUsersQuery();
  const { data: taskData, isLoading: taskLoading } = useGetSingleTasksQuery(id);
  const [loading, setLoading] = useState(false);
  const [updateTask, { isLoading: updating }] = useUpdateTaskMutation();
  const [form] = Form.useForm();

  const filteredUsers = userData?.data?.filter((member) => member.email !== user.email);
  const authOptions = filteredUsers?.map((member) => ({
    value: member?._id?.toLowerCase(),
    label: (
      <Space>
        <Avatar src={member?.authImgUrl} size={32} icon={<UserOutlined />} />
        {member?.authName}
      </Space>
    ),
  }));

  const task = taskData?.data;
  const defaultValues = {
    title: task?.title || "",
    description: task?.description || "",
    auth: task?.auth || "",
  };

  const onSubmit = async (data) => {
    setLoading(true);
    const loadingMessage = message.loading("Updating Task...", 0);
    try {
      await updateTask({ _id: task._id, taskInfo: data }).unwrap();
      onOk();
      message.success("Task Updated Successfully", 2);
    } catch (err) {
      message.error("Something went wrong", 2);
    } finally {
      loadingMessage();
      setLoading(false);
    }
  };

  return (
    <Modal
    title={
        <Space>
            <UserAddOutlined style={{ fontSize: 24, color: '#1890ff' }} />
            <Title level={3} style={{ marginBottom: 0 }}>Update Task</Title>
        </Space>
    }
      open={open}
      onCancel={onCancel}
      footer={null}
      width={600}
      centered
    >
        <Divider></Divider>
      {taskLoading ? (
        <div style={{ textAlign: "center", padding: "50px 0" }}>
          <Spin size="large" />
        </div>
      ) : (
        <TaskForm onSubmit={onSubmit} defaultValues={defaultValues} form={form}>
          <Row gutter={[16, 16]}>
                    <Col xs={24}>
                        <TaskInput type="text" name="title" label="Title" />
                    </Col>
                    <Col xs={24}>
                        <TaskTextArea name="description" label="Description" />
                    </Col>
                    <Col xs={24}>
                        <TaskSelect options={authOptions} name="auth" label="Assign Task to User" />
                    </Col>
                </Row>
          <Divider></Divider>
          
          <Row justify="end">
                    <Space>
                        <Button onClick={onCancel}>Cancel</Button>
                        <Button type="primary" htmlType="submit" loading={loading} disabled={loading}>
                            {loading ? "Updating..." : "Update Task"}
                        </Button>
                    </Space>
                </Row>
        </TaskForm>
      )}
    </Modal>
  );
};

export default EditTaskModal;
