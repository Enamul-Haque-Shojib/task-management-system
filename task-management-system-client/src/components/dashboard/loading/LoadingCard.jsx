


import { Card, Col, Row, Typography } from 'antd';

const { Title } = Typography;

const LoadingCard = ({ title, isLoading }) => {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
       <Title level={2} style={{ textAlign: 'center', marginBottom: '24px' }}>{title}</Title>
      <Row gutter={[16, 16]} justify="start">
        {[...Array(5)].map((_, index) => (
          <Col key={index} xs={24} sm={16} md={12} lg={12} xl={8}>
            <Card loading={isLoading} style={{ width: '100%', maxWidth: 300, margin: 'auto', borderRadius: '8px' }}>
              <Card.Meta title="Loading..." description="Please wait" />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default LoadingCard;
