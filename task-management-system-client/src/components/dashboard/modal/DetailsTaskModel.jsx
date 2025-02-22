import { Modal, Spin, Typography } from 'antd';
import { useGetSingleTasksQuery } from '../../../redux/task/taskApi';

const { Title } = Typography;
const DetailsTaskModel = ({open, onOk, onCancel, id}) => {
    const { data, isLoading } = useGetSingleTasksQuery(id);
    const task = data?.data;
    
  

    if (isLoading) {
        return (
            <div style={{ textAlign: 'center', padding: '50px' }}>
                <Spin size="large" />
            </div>
        );
    }

    const {title, description, auth, category} = task;
    return (
        <Modal title="Details Task" open={open} onOk={onOk} onCancel={onCancel}>
            <Title level={2} style={{ textAlign: 'center' }}>Task Details</Title>
        <h2>{title}</h2>
        <p>{description}</p>
        <p>User: {auth}</p>
        <p>Category: {category}</p>
      </Modal>
    );
};

export default DetailsTaskModel;