import { Avatar, Card, Modal, Spin, Tag, Typography } from 'antd';
import { useGetSingleTasksQuery } from '../../../redux/task/taskApi';
import { UserOutlined } from '@ant-design/icons';

const { Title } = Typography;
const DetailsTaskModel = ({open, onOk, onCancel, id}) => {
    const { data, isLoading } = useGetSingleTasksQuery(id);
    const task = data?.data;
    


    if (isLoading) {
        return (
            <Card loading={isLoading} style={{ minWidth: 300 }}>
        <Card.Meta
      
        />
      </Card>
        );
    }

    // const {title, description, auth, category, createdAt} = task;
    return (
        <Modal title="" open={open} onOk={onOk} onCancel={onCancel} >
            <div style={{display: 'flex', justifyContent:"space-between", alignItems: 'center', marginTop:25}}>
            <Title style={{ textAlign: 'center', fontSize: 20, margin:0 }}>Task Details</Title>
            <Tag bordered={false} color="purple" style={{ fontSize: 15 }}>
        {new Date(task?.createdAt).toLocaleDateString()}
      </Tag>
            </div>
        <h2>{task?.title}</h2>
        <p>{task?.description}</p>
        <div style={{display: 'flex', justifyContent:"space-between", alignItems: 'center'}}>
        <div style={{display: 'flex', alignItems: 'center'}}>
        <Avatar src={task?.auth?.authImgUrl} size={64} icon={<UserOutlined />} />
        <div style={{marginLeft: 8}}>
        <h3>{task?.auth?.authName}</h3>
        <p>{task?.auth?.email}</p>
        </div>
        </div>
        {
            task?.category==='To Do' && <Tag bordered={false} color="blue" style={{ fontSize: 15 }}>
            To Do
          </Tag>
          }
          {
            task?.category==='In Progress' && <Tag bordered={false} color="warning" style={{ fontSize: 15 }}>
            In Progress
          </Tag>
          }
          {
            task?.category==='Done' && <Tag bordered={false} color="success" style={{ fontSize: 15 }}>
            Complete
          </Tag>
          }
        </div>
      
      </Modal>
    );
};

export default DetailsTaskModel;