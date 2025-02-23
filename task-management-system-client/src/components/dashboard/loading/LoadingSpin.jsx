import { Spin } from 'antd';
import React from 'react';

const LoadingSpin = () => {
    return (
        <div style={{ textAlign: 'center', padding: '50px' }}>
                <Spin size="large" />
            </div>
    );
};

export default LoadingSpin;