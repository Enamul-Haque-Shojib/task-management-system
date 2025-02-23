import { Card, Col, Row } from 'antd';


const LoadingCard = ({title, isLoading}) => {
    return (
        <div>
            <h1>{title}</h1>
            <Row gutter={{ xs: 4, sm: 16, md: 24, lg: 32 }}>
                    
                     
                            <Col className="gutter-row" span={6}>
                        
            
                            <Card loading={isLoading} style={{ minWidth: 300 }}>
                                <Card.Meta
                            
                                />
                            </Card>
                             </Col>
                            <Col className="gutter-row" span={6}>
                        
            
                            <Card loading={isLoading} style={{ minWidth: 300 }}>
                                <Card.Meta
                            
                                />
                            </Card>
                             </Col>
                            <Col className="gutter-row" span={6}>
                        
            
                            <Card loading={isLoading} style={{ minWidth: 300 }}>
                                <Card.Meta
                            
                                />
                            </Card>
                             </Col>
                           
                      </Row>
        </div>
    );
};

export default LoadingCard;