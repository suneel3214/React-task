import React, { useState } from 'react'
import { Form, Button, Col, Row, Input, Select, Upload} from 'antd';
import {Typography } from "@mui/material";
import { UploadOutlined } from '@ant-design/icons';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import useAuth from '../../Hooks/useAuth'
const { Option } = Select;
const validateMessages = {
    required: '${label} is required!',
  };
export default function faculty() {

  const [form] = Form.useForm();
  const [image , setImage] = useState(null);
  const {getFacultyAdd} = useAuth();

  const onFinish = (data) => {
    console.log("data",data)
    data.image = image

    var form = new FormData();
    form.append('image' ,image)
    form.append('name' ,data.name)
    form.append('lname' ,data.lname)
    form.append('gender' ,data.gender)
    form.append('qualification' ,data.qualification)
    form.append('mobile' ,data.mobile)
    form.append('email' ,data.email)
    form.append('country' ,data.country)
    form.append('state' ,data.state)
    form.append('city' ,data.city)
    form.append('pincode' ,data.pincode)
    form.append('dept' ,data.dept)
    form.append('user_id' ,localStorage.getItem('userId'))
    console.log("form",form)

    getFacultyAdd(form);
    form.resetFields();

  }

  const UploadFile = (file,type) => {

    if(type === 'image')
    setImage(file);

  }
  return (
    <>
    <Row>
      <Col span={12}>
        <Typography style={{marginTop:"40px",textAlign:"center"}} variant="h4" gutterBottom component="div">
           Faculty Created Form
        </Typography>
        <Form layout="vertical"
         style={{padding:"0px 80px"}}
          hideRequiredMark
          form={form}
          onFinish={onFinish}
          >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="First Name"
                rules={[{ required: true, message: 'Please enter user name' }]}
              >
                <Input name="name" placeholder="Please enter user name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="lname"
                label="Last Name"
                rules={[{ required: true, message: 'Please enter last name' }]}
              >
                <Input  name="lname" placeholder="Please enter last name" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="gender"
                label="Gender"
                rules={[{ required: true, message: 'Please select an gender' }]}
              >
                <Select  name="gender" placeholder="Please select an gender">
                  <Option value="male">Male</Option>
                  <Option value="female">Female</Option>
                  <Option value="other">Other</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="qualification"
                label="Higher Qualification"
                rules={[{ required: true, message: 'Please choose the Qualification' }]}
              >
                <Select   name="qualification" placeholder="Please choose the Qualification">
                  <Option value="Doctoral degree">Doctoral degree</Option>
                  <Option value="Masters degree">Masters degree</Option>
                  <Option value="Graduate diploma">Graduate diploma</Option>
                  <Option value="Graduate certificate">Graduate certificate</Option>
                  <Option value="Bachelor degree">Bachelor degree</Option>
                  <Option value="Advanced diploma / Associates degree">Advanced diploma / Associates degree</Option>
                  <Option value="Diploma">Diploma</Option>
                  <Option value="12th">12th</Option>
                  <Option value="10th">10th</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="mobile"
                label="Contact"
                rules={[{ required: true, message: 'Please enter Number' }]}
              >
                <Input name="mobile" placeholder="Please enter Number" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="email"
                label="Email"
                rules={[{ required: true, message: 'Please enter email' }]}
              >
                <Input  name="email" placeholder="Please enter email" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="country"
                label="Country"
                rules={[{ required: true, message: 'Please enter Country' }]}
              >
                <Input name="country" placeholder="Please enter Country" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="state"
                label="State"
                rules={[{ required: true, message: 'Please enter state' }]}
              >
                <Input  name="state" placeholder="Please enter state" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="city"
                label="City"
                rules={[{ required: true, message: 'Please enter city' }]}
              >
                <Input   name="city" placeholder="Please enter city" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="pincode"
                label="Pincode"
                rules={[{ required: true, message: 'Please enter pincode' }]}
              >
                <Input  name="pincode" placeholder="Please enter pincode" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="dept"
                label="Department"
                rules={[{ required: true, message: 'Select department' }]}
              >
               <Select  name="dept" placeholder="Please choose the branch">
                  <Option value="Computer Science">Computer Science</Option>
                  <Option value="Electrical">Electrical</Option>
                  <Option value="Civil">Civil</Option>
                  <Option value="Machenical">Machenical</Option>
                  <Option value="Tele Communication">Tele Communication</Option>
                  <Option value="Information technology">Information technology</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                  label="Profile"
                  name="image"
                  className='lebal'
                  rules={[{ required: true, message: 'Profile!' }]}
                >
                <Upload 
                  type="file"
                  name="image"
                  onChange={(event) => UploadFile(event.file.originFileObj,'image')}
                  >
                  <Button icon={<UploadOutlined />}>Click to Upload</Button><br />
                  <span style={{color:'red'}}>Image types: 'jpeg , jpg , png , webp'</span>
                  </Upload>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
                <Form.Item wrapperCol={{ offset: 12, span: 16 }}>
                  <Button type="primary" variant="contained"  color="secondary" htmlType="submit">
                    Create
                  </Button>
                </Form.Item>
            </Col>
          </Row>     
        </Form>
      </Col>
      <Col span={12}>
        <img src="https://pharmacyschool.usc.edu/wp-content/uploads/2021/11/Research-and-Faculty-banner-768x768.png" alt="" />
      </Col>
    </Row>
    </>
  )
}
