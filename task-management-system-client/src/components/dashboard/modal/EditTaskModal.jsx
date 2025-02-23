/* eslint-disable no-unused-vars */
import { Avatar, Button, message, Modal, Typography } from "antd";
import TaskForm from "../form/TaskForm";
import TaskInput from "../form/TaskInput";
import TaskTextArea from "../form/TaskTextArea";
import TaskSelect from "../form/TaskSelect";
import { useUpdateTaskMutation } from "../../../redux/admin/adminApi";
import { useGetSingleTasksQuery } from "../../../redux/task/taskApi";
import { UserOutlined } from '@ant-design/icons';
import { useGetAllUsersQuery } from "../../../redux/auth/authApi";
import useAuth from "../../../hooks/useAuth";


const { Title } = Typography;
const EditTaskModal = ({open, onOk, onCancel, id}) => {
    const {user} = useAuth()
    const { data: userData } = useGetAllUsersQuery(undefined);
  
    const filterAuth = userData?.data?.filter(member => member.email != user.email );

    const authOptions = filterAuth?.map((member) => ({
        value: member?._id?.toLowerCase(),
        label: <><Avatar src={member?.authImgUrl} size={40} icon={<UserOutlined />} />  {member?.authName}</>
      }));
    const [updateTask] = useUpdateTaskMutation();
    const { data: getSingleTask, isLoading } = useGetSingleTasksQuery(id);

    const { _id, title, description, auth } = getSingleTask?.data || {};

    const defaultValues = {
        title: title || '',
        description: description || '',
        auth: auth || ''
    };

    const onSubmit = async (data) => {
        const loadingMessage = message.loading('Updating Task...', 0);
        const taskInfo = {
                    title: data.title,
                    description: data.description,
                    auth: data.auth
                };
            try{

            await updateTask({ _id, taskInfo }).unwrap();
            onOk();
            loadingMessage(); 
            message.success('Task Updated Successfully', 2);
        } catch (err) {
            loadingMessage(); 
            message.error('Something went wrong', 2);
        }
    };
    return (
        <Modal
        title="" 
        open={open} 
        onOk={onOk} 
        onCancel={onCancel}
   
       okText='Update Task'
       cancelText="Cancel"
        >

        <Title level={2} style={{ textAlign: 'center' }}>Edit Task</Title>
           <TaskForm onSubmit={onSubmit} defaultValues={defaultValues}>
        
           <TaskInput type="text" name="title" label="Title" />
           <TaskTextArea name="description" label="Description" />
        
           <TaskSelect options={authOptions} name="auth" label="Assigned the Task to User" />
                 
                      
                  

           <Button type="primary" htmlType="submit" >Update Task</Button>
    
         
     
           </TaskForm>
     </Modal>
    );
};

export default EditTaskModal;