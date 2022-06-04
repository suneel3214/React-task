import React,{useState,useEffect} from 'react'
import useAuth from "../../Hooks/useAuth";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Row, Col , Button ,Modal ,Form, Input,Upload} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import { notification } from "antd";
import { SmileOutlined } from "@ant-design/icons";
const validateMessages = {
  required: '${label} is required!',
};
export default function bookListing() {

  const [listing, setListing] = useState([]);
  const { userBooks } = useAuth();
  const [page , setPage] = React.useState(0);
  const [rowsPerPage , setRowsPerPage] = React.useState(5);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [authors , setAuthors] = useState("");
  const [title , setTitle] = useState("");
  const [subtitle , setSubTitle] = useState("");
  const { getBookUpdate } = useAuth();
  const [bookListData, setBookListData] = useState([]);
  const [small_thumbnail, setSmallthumbnail] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const { getBookDelete } = useAuth();
  useEffect( () => {
    bookList();
 }, []);

 useEffect(()=>{
  setBookListData(listing)
},[listing])


  const  bookList = async () => {
  var list = await userBooks().then(res=>{
    setListing(res)
  }).catch((error)=>{
    return error
  })

 }
// console.log("listing",listing)

const handleChangePage = (event , newPage) => {
  setPage(newPage);
}

const handleChangeRowsPerPage = (event) => {
  setRowsPerPage(+event.target.value)
  setPage(0);
}

 const columns = [
  { id: 'title', label: 'Title', minWidth: 150 },
  { id: 'subtitle', label: 'Subtitle', minWidth: 100 },
  { id: 'authors', label: 'Authors', minWidth: 150 },
  { id: 'small_thumbnail', label: 'Front-Image', minWidth: 150 },
  { id: 'thumbnail', label: 'Back-Image', minWidth: 150 },
  { id: 'edit', label: 'Edit', minWidth: 150 },
  { id: 'Delete', label: 'Delete', minWidth: 150 },
 
];

const editBook = async(id) => {
  var bookData = listing.filter((e) => {return e.id === id })
  console.log("bookData",bookData);
  form.resetFields();
  form.setFieldsValue({...bookData[0]})
  setAuthors(bookData[0].authors)
  setTitle(bookData[0].title)
  setSubTitle(bookData[0].subtitle)
  setSmallthumbnail(bookData[0].small_thumbnail)
  setThumbnail(bookData[0].thumbnail)
  localStorage.setItem('BookId', bookData[0].id)
  setEditModalVisible(true)
};

const handleEditCancel = () => {
  setEditModalVisible(false);
};


const onFinish = (data) => {   
  data.small_thumbnail = small_thumbnail
  data.thumbnail = thumbnail
  var form = new FormData()
  form.append('thumbnail',thumbnail)
  form.append('small_thumbnail',small_thumbnail)
  form.append('title',data.title)
  form.append('subtitle',data.subtitle)
  form.append('authors',data.authors)
  form.append('user_id', localStorage.getItem('userId'))
  
  getBookUpdate(form);
  setEditModalVisible(false);
  bookList();
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

function deleteUser(id){
  axios.post(`http://127.0.0.1:8000/api/book/${id}`).then((response)=>{
    bookList()
    if (response.status === 200) {             

      notification.open({
        message: "Deleted",
        description: "Book Deleted SuccessFully...!!",
        icon: <SmileOutlined style={{ color: "#108ee9" }} />,
      });
      return response
  }
  })

}

  return (
    <>
    <Row justify="center">
      <Col span={16}>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {listing

              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

              .map((rows,index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index} >
                        <TableCell> {listing ? rows.title:''} </TableCell>
                        <TableCell> {listing ? rows.subtitle:''} </TableCell>
                        <TableCell> {listing ? rows.authors:''} </TableCell>
                        <TableCell> <img
                          style={{borderRadius:'100%',height:"50px"}}
                          src={`http://localhost:8000/image/${rows.small_thumbnail}`}
                          width={60}
                          alt=''/> 
                        </TableCell>
                        <TableCell> <img
                           style={{borderRadius:'100%',height:"50px"}}
                          src={`http://localhost:8000/image/${rows.thumbnail}`}
                          width={60}
                          alt=''/> 
                        </TableCell>
                        <TableCell> <Button onClick={(()=>editBook(rows.id))}>Edit</Button> </TableCell>
                        {/* <TableCell> <Button onClick={(()=>deleteBook(rows.id))}>Delete</Button> </TableCell> */}
                        <TableCell> <Button onClick={()=>deleteUser(rows.id)}>Delete</Button> </TableCell>

                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal
        title="Edit Book"
        visible={editModalVisible}
        onCancel={handleEditCancel}
        okButtonProps={{
          style: {
            display: "none",
          },
        }}

      >
         <Form
              form={form}
              name="basic"
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 8 }}
              initialValues={{ remember: true }}
              autoComplete="off"
              onFinish={onFinish}
              layout="vertical" 
              className='edit-form'
            >
              <Form.Item
                label="Title"
                name="title"
                style={{width:'100%'}}
                className='lebal'
                rules={[{ required: true, message: 'title!' }]}
              >
                <Input placeholder="Title" defaultValue={title} name="title" onChange={(event)=>setTitle(event.target.value)}/>
              </Form.Item>
              <Form.Item
                label="SubTitle"
                name="subtitle"
                className='lebal'
                rules={[{ required: true, message: 'subtitle!' }]}
              >
                <Input  placeholder="subtitle" defaultValue={subtitle} name="subtitle" onChange={(event)=>setSubTitle(event.target.value)}/>
              </Form.Item>

              <Form.Item
                label="Authors"
                name="authors"
                className='lebal'
                rules={[{ required: true, message: 'authors!' }]}
              >
                <Input name="authors" placeholder="authors" defaultValue={authors} onChange={(event)=>setAuthors(event.target.value)}/>
              </Form.Item>

              <Form.Item
                label="Small_thumbnail"
                name="small_thumbnail"
                className='lebal'
                rules={[{ required: true, message: 'small_thumbnail!' }]}
              >
              <img
              style={{borderRadius:'100%',height:"35px"}}
              src={`http://localhost:8000/image/${small_thumbnail}`}
              width={30}
              alt=''/> &nbsp;&nbsp;
              <Upload 
                type="file"
                name="small_thumbnail"
                onChange={(event) => uploadFile(event.file.originFileObj,'first') }
                >
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>
              </Form.Item>

              <Form.Item
                label="Thumbnail"
                name="thumbnail"
                className='lebal'
                rules={[{ required: true, message: 'thumbnail!' }]}
              >
              <img
              style={{borderRadius:'100%',height:"35px"}}
              src={`http://localhost:8000/image/${thumbnail}`}
              width={30}
              alt=''/> &nbsp;&nbsp;
              <Upload 
                type="file"
                name="thumbnail"
                onChange={(event) => uploadFile(event.file.originFileObj,'second') }
                >
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>
              </Form.Item>
              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button  type="primary" variant="contained"  color="secondary" htmlType="submit">
                  Update
                </Button>
              </Form.Item>
          </Form>
      </Modal>
      <TablePagination
        rowsPerPageOptions={[5 , 10, 25, 100]}
        component="div"
        count={listing.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
      </Col>
    </Row>
   </>
  )
}
