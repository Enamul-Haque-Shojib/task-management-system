
import { Form, Input } from 'antd';

import { Controller } from 'react-hook-form';

const TaskInput = ({type, name, label, disabled}) => {
    return (
        <div>
            <Controller
            name={name}
            render={({ field }) => (
              <Form.Item label={label}>
                <Input
                  {...field}
                  type={type}
                  id={name}
                  size="large"
                  disabled={disabled}
                  required
                />
              </Form.Item>
            )}
            />
               
        </div>
    );
};

export default TaskInput;