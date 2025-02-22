
import { Form, Select } from 'antd';

import { Controller } from 'react-hook-form';

const TaskSelect = ({ label, name, options, disabled, mode }) => {
    return (
        <Controller
          name={name}
          render={({ field, fieldState: { error } }) => (
            <Form.Item label={label}>
              <Select
              
                mode={mode}
                style={{ width: '100%' }}
                {...field}
                options={options}
                size="large"
                disabled={disabled}
                
              />
              {error && <small style={{ color: 'red' }}>{error.message}</small>}
            </Form.Item>
          )}
        />
      );
};

export default TaskSelect;