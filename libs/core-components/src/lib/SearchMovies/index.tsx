import React, { FC, useState } from 'react';
import {
  Tooltip,
  Modal,
  Form,
  Select,
  Button,
  message,
  Input,
  Row,
  Col,
} from 'antd';
import { SearchFilterInput } from '@imbd-react-testing/interfaces';

interface ISearchMovies {
  onSubmit: (values: SearchFilterInput) => void;
  resetState: boolean;
  resetFunc: () => void
}

const SearchMovies: FC<ISearchMovies> = ({ onSubmit, resetState, resetFunc }) => {
  const [form] = Form.useForm();

  const onFinish = (values: { searchInput: string }) => {
    if (form.isFieldsTouched()) {
      console.log('values =', values);
      return onSubmit(values);
    }
    return message.error('No changes detected');
  };

  const resetForm = () => {
    resetFunc()
    form.resetFields();
  };

  return (
    <Form
      // wrapperCol={{ span: 20 }}
      className="d-flex justify-between"
      layout={'inline'}
      form={form}
      onFinish={onFinish}
      initialValues={{
        searchInput: '',
      }}
    >
      <Row gutter={[0, 10]} align="middle" justify="space-around" className="w-100">
        <Col span={20}>
          <Form.Item
            className="w-100"
            name="searchInput"
            label="Search Input"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col
          span={4}
          style={{
            textAlign: 'right',
          }}
        >
          <Button type="primary" htmlType="submit">
            Search
          </Button>
          <Button
            style={{
              margin: '0 8px',
            }}
            onClick={resetForm}
          >
            Clear
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export { SearchMovies };
