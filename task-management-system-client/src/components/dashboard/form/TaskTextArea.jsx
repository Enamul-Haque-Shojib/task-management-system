import { Form, Input } from 'antd';

import { Controller } from 'react-hook-form';

const TaskTextArea = ({name, label}) => {
    return (
        <div>
            <Controller
            name={name}
            render={({ field }) => (
              <Form.Item label={label}>
                <Input.TextArea
                  {...field}
                  id={name}
                  size="large"
                required
                />
              </Form.Item>
            )}
            />
               
        </div>
    );
};

export default TaskTextArea;