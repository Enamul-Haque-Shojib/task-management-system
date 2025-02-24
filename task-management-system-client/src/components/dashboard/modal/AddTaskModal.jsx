// /* eslint-disable no-unused-vars */
// import { Avatar, Button, Col, message, Modal, Row, Space, Typography } from 'antd';
// import TaskForm from '../form/TaskForm';
// import TaskInput from '../form/TaskInput';
// import { useAddTaskMutation } from '../../../redux/admin/adminApi';
// import TaskTextArea from '../form/TaskTextArea';
// import TaskSelect from '../form/TaskSelect';
// import { useGetAllUsersQuery } from '../../../redux/auth/authApi';
// import { UserOutlined } from '@ant-design/icons';
// import useAuth from '../../../hooks/useAuth';

// const { Title } = Typography;
// const AddTaskModal = ({open, onOk, onCancel}) => {
//     const {user} = useAuth()

   
//     const { data: userData, isLoading } = useGetAllUsersQuery(undefined);

//     const filterAuth = userData?.data?.filter(member => member.email != user.email );
  
//     const authOptions = filterAuth?.map((member) => ({
//         value: member?._id?.toLowerCase(),
//         label: <><Avatar src={member?.authImgUrl} size={40} icon={<UserOutlined />} />  {member?.authName}</>
//       }));

//     const [addTask] = useAddTaskMutation();
    
//     const defaultValues = {
//         title: '',
//         description: '',
//         auth: '',
//     };

//     const onSubmit = async (data) => {
//         const loadingMessage = message.loading('Creating Task...', 0);
//         try {
        
//             const taskInfo = {
//                 title: data.title,
//                 description: data.description,
//                 auth: data.auth,
          
//             };
//             console.log(taskInfo);
            
//             await addTask(taskInfo).unwrap();
//             onOk()
//             loadingMessage(); 
//             message.success('Task Added Successfully', 2);
//         } catch (err) {
//             loadingMessage(); 
//             message.error('Something went wrong', 2);
//         }
//     };

//     return (
//         <Modal
//          title="" 
//          open={open} 
//          onOk={onOk} 
//          onCancel={onCancel}
    
//         okText='Add Task'
//         cancelText="Cancel"
//          >

//          <Title level={2} style={{ textAlign: 'center' }}>Add Task</Title>
//             <TaskForm onSubmit={onSubmit} defaultValues={defaultValues}>
         
//             <TaskInput type="text" name="title" label="Title" />
//             <TaskTextArea name="description" label="Description" />
         
//             <TaskSelect options={authOptions} name="auth" label="Assigned the Task to User" />
                  
                       
                   

//             <Button type="primary" htmlType="submit" >Add Task</Button>
     
          
      
//             </TaskForm>
//       </Modal>
//     );
// };

// export default AddTaskModal;

/* eslint-disable no-unused-vars */
import { Avatar, Button, Col, message, Modal, Row, Typography, Divider, Space } from 'antd';
import { UserAddOutlined, UserOutlined } from '@ant-design/icons';
import TaskForm from '../form/TaskForm';
import TaskInput from '../form/TaskInput';
import TaskTextArea from '../form/TaskTextArea';
import TaskSelect from '../form/TaskSelect';
import { useAddTaskMutation } from '../../../redux/admin/adminApi';
import { useGetAllUsersQuery } from '../../../redux/auth/authApi';
import useAuth from '../../../hooks/useAuth';
import { useState } from 'react';

const { Title } = Typography;

const AddTaskModal = ({ open, onOk, onCancel }) => {
    const { user } = useAuth();
    const { data: userData, isLoading } = useGetAllUsersQuery(undefined);
    const [loading, setLoading] = useState(false);

    const filterAuth = userData?.data?.filter(member => member.email !== user.email);
  
    const authOptions = filterAuth?.map((member) => ({
        value: member?._id?.toLowerCase(),
        label: (
            <Space>
                <Avatar src={member?.authImgUrl} size={32} icon={<UserOutlined />} />
                {member?.authName}
            </Space>
        ),
    }));

    const [addTask] = useAddTaskMutation();

    const defaultValues = {
        title: '',
        description: '',
        auth: '',
    };

    const onSubmit = async (data) => {
        setLoading(true);
        const loadingMessage = message.loading('Creating Task...', 0);
        
        try {
            const taskInfo = {
                title: data.title,
                description: data.description,
                auth: data.auth,
            };

            await addTask(taskInfo).unwrap();
            onOk();
            message.success('Task Added Successfully', 2);
        } catch (err) {
            message.error('Something went wrong', 2);
        } finally {
            setLoading(false);
            loadingMessage();
        }
    };

    return (
        <Modal
            title={
                <Space>
                    <UserAddOutlined style={{ fontSize: 24, color: '#1890ff' }} />
                    <Title level={3} style={{ marginBottom: 0 }}>Add Task</Title>
                </Space>
            }
            open={open}
            onCancel={onCancel}
            footer={null}
            width={600} // Adjusted modal width
            centered
        >
            <Divider />
            <TaskForm onSubmit={onSubmit} defaultValues={defaultValues}>
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

                <Divider />

                <Row justify="end">
                    <Space>
                        <Button onClick={onCancel}>Cancel</Button>
                        <Button type="primary" htmlType="submit" loading={loading} disabled={loading}>
                            {loading ? "Adding..." : "Add Task"}
                        </Button>
                    </Space>
                </Row>
            </TaskForm>
        </Modal>
    );
};

export default AddTaskModal;
