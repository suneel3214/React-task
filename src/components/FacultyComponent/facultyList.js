import React,{useState,useEffect} from 'react'
import { Button, Col, Row , Modal,Spin } from 'antd';
import {Typography } from "@mui/material";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import useAuth from '../../Hooks/useAuth';
import TablePagination from '@mui/material/TablePagination';
import axios from 'axios';
import { notification } from "antd";
import { SmileOutlined } from "@ant-design/icons";
export default function facultyList() {

const [facultyListing , setFacultyListing] = useState([]);
const [facultyListData , setFacultyListData] = useState([]);
const [rowsPerPage,setRowsPerPage] = React.useState(5);
const [page , setPage] = React.useState(0);
const [editModalVisible, setEditModalVisible] = useState(false);
const [name , setName] = useState("");
const [lastname , setLatsName] = useState("");
const [email , setEmail] = useState("");
const [conatct , setContact] = useState("");
const [gender , setGender] = useState("");
const [qualification , setQualification] = useState("");
const [country , setCountry] = useState("");
const [state , setState] = useState("");
const [city , setCity] = useState("");
const [pincode , setPincode] = useState("");
const [dept , setDept] = useState("");
const [image , setImage] = useState("");
const [loading , setLoading] = useState(false);


const {getFacultyListing} = useAuth();

  var serialNum = 1 ;

    const columns = [
        { id: '#', label: '#', minWidth: 150 },
        { id: 'name', label: 'Name', minWidth: 150 },
        { id: 'email', label: 'Email', minWidth: 100 },
        { id: 'contact', label: 'Contact', minWidth: 150 },
        { id: 'city', label: 'City', minWidth: 150 },
        { id: 'profile', label: 'Profile', minWidth: 150 },
        { id: 'view', label: 'View', minWidth: 150 },
        { id: 'edit', label: 'Edit', minWidth: 150 },
        { id: 'Delete', label: 'Delete', minWidth: 150 },
       
      ];

        useEffect( () =>{
            FacultyList()
        },[])

       useEffect( () =>{
        setFacultyListData(facultyListing)
       },[facultyListing])

      const FacultyList = async () => {
        var list = await getFacultyListing().then(res=>{
            setFacultyListing(res)
            setLoading(true)
        }).catch((error)=>{
            return error
        })
      }
      const handleChangePage = (event , newPage) =>{
        setPage(newPage);
      }

      const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value)
        setPage(0);
      }
      const viewProfile = (id) => {
        var singleData = facultyListing.filter((e) => {return e.id === id});
        setName(singleData[0].name)
        setLatsName(singleData[0].lname)
        setEmail(singleData[0].email)
        setContact(singleData[0].mobile)
        setGender(singleData[0].gender)
        setQualification(singleData[0].qualification)
        setCountry(singleData[0].country)
        setState(singleData[0].state)
        setCity(singleData[0].city)
        setPincode(singleData[0].pincode)
        setDept(singleData[0].dept)
        setImage(singleData[0].image)

        setEditModalVisible(true);
      }
      const handleEditCancel = () => {
        setEditModalVisible(false);
      };

      function deleteFaculty(id){
        axios.post(`http://127.0.0.1:8000/api/admin/faculty_delete/${id}`).then((response)=>{
          FacultyList()
          if (response.status === 200) {             
      
            notification.open({
              message: "Deleted",
              description: "Deleted SuccessFully...!!",
              icon: <SmileOutlined style={{ color: "#108ee9" }} />,
            });
            return response
        }
        })
      
      }
  return (
    <>
    <Row style={{padding:'0px 65px'}}>
      <Col span={24}>
        <Typography style={{marginTop:"40px",textAlign:"center"}} variant="h4" gutterBottom component="div">
           Faculty List
        </Typography>
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
                {loading ? 
                <TableBody>
                {facultyListing
                .slice(page * rowsPerPage , page * rowsPerPage + rowsPerPage)
                .map((rows ,index) =>{
                    return (
                   <TableRow hover role="checkbox" tabIndex={-1} key={index} >
                        <TableCell> {serialNum ++} </TableCell>
                        <TableCell> {facultyListing ? rows.name:''} </TableCell>
                        <TableCell> {facultyListing ? rows.lname:''} </TableCell>
                        <TableCell> {facultyListing ? rows.email:''} </TableCell>
                        <TableCell> {facultyListing ? rows.city:''} </TableCell>
                        <TableCell> 
                        <img src={`http://localhost:8000/image/${rows.image}`} alt="" style={{borderRadius:'100%',height:"50px"}} width={60}/>    
                         </TableCell>
                        <TableCell> <Button onClick={(()=>viewProfile(rows.id))}>View</Button> </TableCell>
                        <TableCell> <Button>Edit</Button> </TableCell>
                        <TableCell> <Button onClick={(()=>deleteFaculty(rows.id))}>Delete</Button> </TableCell>
                  </TableRow>
                    );
                })}
                </TableBody>
                   :<div className="example"><Spin /></div>}
                </Table>
            </TableContainer>
            <Modal
              title="Profile"
              visible={editModalVisible}
              onCancel={handleEditCancel}
              okButtonProps={{
              style: {
                display: "none",
              },
              }}
            >
         
             <h1>FirstName: &nbsp;&nbsp;&nbsp;&nbsp;<span className='fac-profiile-view'>{name}</span></h1>
             <h1>LastName: &nbsp;&nbsp;&nbsp;&nbsp;<span className='fac-profiile-view'>{lastname}</span></h1>
             <h1>Email: &nbsp;&nbsp;&nbsp;&nbsp;<span className='fac-profiile-view'>{email}</span></h1>
             <h1>Conatct: &nbsp;&nbsp;&nbsp;&nbsp;<span className='fac-profiile-view'>{conatct}</span></h1>
             <h1>Gender: &nbsp;&nbsp;&nbsp;&nbsp;<span className='fac-profiile-view'>{gender}</span></h1>
             <h1>Qualification: &nbsp;&nbsp;&nbsp;&nbsp;<span className='fac-profiile-view'>{qualification}</span></h1>
             <h1>Department: &nbsp;&nbsp;&nbsp;&nbsp;<span className='fac-profiile-view'>{dept}</span></h1>
             <h1>Country: &nbsp;&nbsp;&nbsp;&nbsp;<span className='fac-profiile-view'>{country}</span></h1>
             <h1>State: &nbsp;&nbsp;&nbsp;&nbsp;<span className='fac-profiile-view'>{state}</span></h1>
             <h1>City: &nbsp;&nbsp;&nbsp;&nbsp;<span className='fac-profiile-view'>{city}</span></h1>
             <h1>Pin-Code: &nbsp;&nbsp;&nbsp;&nbsp;<span className='fac-profiile-view'>{pincode}</span></h1>
             <img src={`http://localhost:8000/image/${image}`} alt="" style={{width:"80px",height:"80px",borderRadius:'50%'}} />

            </Modal>
            <TablePagination
              rowsPerPageOptions={[5 , 10, 25, 100]}
              component="div"
              count={facultyListing.length}
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
