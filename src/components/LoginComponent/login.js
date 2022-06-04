import React from 'react'
import { Row, Col ,Form, Input, Button,} from 'antd';
import { useHistory } from 'react-router-dom';
import useAuth from "../../Hooks/useAuth";
import {
    Typography,
  } from "@mui/material";
const validateMessages = {
    required: '${label} is required!',
    types: {
      email: '${label} is not a valid email!',
    },
  };
export default function login() {

    const [form] = Form.useForm();
    const history = useHistory();
    const { getUserLogin } = useAuth();

     const onLogin = (data) => {
      getUserLogin(data);
      form.resetFields();
      localStorage.setItem('data', data.email);
      history.push('/');

  };
  return (
    <>
    <Row justify="center">
      <Col span={16}>
        <Typography  variant="h4" gutterBottom component="div">
        Login Form
        </Typography>
      <Form
                  form={form}
                  name="basic"
                  labelCol={{ span: 4 }}
                  wrapperCol={{ span: 8 }}
                  initialValues={{ remember: true }}
                  onFinish={onLogin}
                  autoComplete="off"
                  layout="vertical" 
                >
                  <Form.Item
                    label="Email"
                    name="email"
                    className='lebal'
                    rules={[{ required: true, message: 'Please Enter your Email!' }]}
                  >
                    <Input  placeholder="Email" name="email"/>
                  </Form.Item>

                  <Form.Item
                    label="Password"
                    name="password"
                    className='lebal'
                    rules={[{ required: true, message: 'Please Enter your password!' }]}
                  >
                    <Input.Password name="password" placeholder="Password"/>
                  </Form.Item>
                  <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" variant="contained"  color="secondary" htmlType="submit">
                      Login
                    </Button>
                  </Form.Item>
                </Form>
      </Col>
    </Row>
    </>
  )
}
