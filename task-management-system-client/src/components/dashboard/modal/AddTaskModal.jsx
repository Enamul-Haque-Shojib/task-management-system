/* eslint-disable no-unused-vars */
import { Button, Col, message, Modal, Row, Space, Typography } from 'antd';
import TaskForm from '../form/TaskForm';
import TaskInput from '../form/TaskInput';
import { useAddTaskMutation } from '../../../redux/admin/adminApi';
import TaskTextArea from '../form/TaskTextArea';
import TaskSelect from '../form/TaskSelect';

const authMember = ['sdsg','sdfs','67b890e17d9e00041dd32981'];
export const authOptions = authMember.map((member) => ({
    value: member.toLowerCase(),
    label: member,
  }));
  

const { Title } = Typography;
const AddTaskModal = ({open, onOk, onCancel}) => {

   

    const [addTask] = useAddTaskMutation();
    
    const defaultValues = {
        title: '',
        description: '',
        auth: '',
    };

    const onSubmit = async (data) => {
        const loadingMessage = message.loading('Creating Task...', 0);
        try {
        
            const taskInfo = {
                title: data.title,
                description: data.description,
                auth: data.auth,
          
            };
            
            await addTask(taskInfo).unwrap();
            onOk()
            loadingMessage(); 
            message.success('Task Added Successfully', 2);
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
    
        okText='Add Task'
        cancelText="Cancel"
         >

         <Title level={2} style={{ textAlign: 'center' }}>Add Task</Title>
            <TaskForm onSubmit={onSubmit} defaultValues={defaultValues}>
         
            <TaskInput type="text" name="title" label="Title" />
            <TaskTextArea name="description" label="Description" />
         
            <TaskSelect options={authOptions} name="auth" label="Assigned the Task to User" />
                  
                       
                   

            <Button type="primary" htmlType="submit" >Add Task</Button>
     
          
      
            </TaskForm>
      </Modal>
    );
};

export default AddTaskModal;