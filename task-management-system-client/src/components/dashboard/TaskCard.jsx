
import { EditOutlined, FullscreenOutlined,DeleteOutlined } from '@ant-design/icons';
import { Avatar, Card } from 'antd';
const { Meta } = Card;
import { useState } from 'react';
import { Modal } from 'antd';

const TaskCard = ({task}) => {

    const {title, description} = task;

    const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
    return (
        <div>
            <Card
        style={{
          width: 300,
        }}
       
        actions={[
          <FullscreenOutlined  key="fullscreen" type="primary" onClick={showModal}/>,
          <EditOutlined key="edit" />,
        
          <DeleteOutlined  key="delete" />,
        ]}
      >
        <Meta 
        style={{
            height: 100,
          }}
        //   avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
          title={title}
          description={description.length>100 ? `${description.slice(0,100)}...` : description}
        />
      </Card>
      <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
        </div>
    );
};

export default TaskCard;