import React,{useState} from 'react'
import { Row, Col ,Form, Input, Button,Upload} from 'antd';
import { useHistory } from 'react-router-dom';
import { UploadOutlined } from '@ant-design/icons';
import useAuth from "../../Hooks/useAuth";
import {
    Typography,
  } from "@mui/material";
const validateMessages = {
    required: '${label} is required!',
  };
export default function book() {
    const [form] = Form.useForm();
    const history = useHistory();
    const [small_thumbnail, setSmallthumbnail] = useState(null);
    const [thumbnail, setThumbnail] = useState(null);

    const { getBookRegister } = useAuth();
    const onFinish = (data) => {   
        // console.log("data",data);     
        data.small_thumbnail = small_thumbnail
        data.thumbnail = thumbnail
        var form = new FormData()
        form.append('thumbnail',thumbnail)
        form.append('small_thumbnail',small_thumbnail)
        form.append('title',data.title)
        form.append('subtitle',data.subtitle)
        form.append('authors',data.authors)
        form.append('user_id', localStorage.getItem('userId'))
        
        getBookRegister(form);
        form.resetFields();
      };
    
    const uploadFile = (file,type)=>{
        console.log(file)
        if(type==='first'){
            setSmallthumbnail(file)            
         }
         else{
            setThumbnail(file)
         }
    }
   
    const UserId =   localStorage.getItem('userId');
    // console.log(UserId);
  return (
    <>
    <Row>
      <Col span={12}>
        <Typography style={{marginTop:"40px",textAlign:"center"}} variant="h4" gutterBottom component="div">
        Book Created Form
        </Typography>
          <Form
              style={{margin:"0px 80px"}}
              form={form}
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              initialValues={{ remember: true }}
              onFinish={onFinish}
              autoComplete="off"
              layout="vertical" 
            >

              <Form.Item
                label="Title"
                name="title"
                className='lebal'
                rules={[{ required: true, message: 'title!' }]}
              >
                <Input placeholder="Title" name="title"/>
              </Form.Item>
              <Form.Item
                label="SubTitle"
                name="subtitle"
                className='lebal'
                rules={[{ required: true, message: 'subtitle!' }]}
              >
                <Input  placeholder="subtitle" name="subtitle"/>
              </Form.Item>

              <Form.Item
                label="Authors"
                name="authors"
                className='lebal'
                rules={[{ required: true, message: 'authors!' }]}
              >
                <Input name="authors" placeholder="authors"/>
              </Form.Item>
              <Row gutter={16}>
                <Col span={10.5}>
                  <Form.Item
                  label="Small_thumbnail"
                  name="small_thumbnail"
                  className='lebal'
                  rules={[{ required: true, message: 'small_thumbnail!' }]}
                  >
                    <Upload 
                    type="file"
                    name="small_thumbnail"
                    onChange={(event) => uploadFile(event.file.originFileObj,'first') }
                    >
                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                    </Upload>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Thumbnail"
                    name="thumbnail"
                    className='lebal'
                    rules={[{ required: true, message: 'thumbnail!' }]}
                    >
                    <Upload 
                    type="file"
                    name="thumbnail"
                    onChange={(event) => uploadFile(event.file.originFileObj,'second') }
                    >
                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                    </Upload>
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" variant="contained"  color="secondary" htmlType="submit">
                  Create
                </Button>
              </Form.Item>
          </Form>
      </Col>
      <Col span={12}>
      <img className='book-img' src="https://img.freepik.com/free-psd/banner-bookstore-ad-template_23-2148680419.jpg?w=2000" alt="" />
      </Col>
    </Row>
    </>
  )
}
