import React, { useEffect, useState } from "react";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';
import { Row, Col  } from 'antd';
export default function index() {


  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [books, setBooks] = useState([]);
  
  useEffect( () => {
     booksList();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };


const columns = [
    { id: 'title', label: 'title', minWidth: 170 },
    { id: 'subtitle', label: 'subtitle', minWidth: 100 },
    {
      id: 'authors',
      label: 'authors',
      minWidth: 170,
      align: 'right',
    },
   
  ];
  
  function createData(title, subtitle, authors) {
    return { title, subtitle, authors };
  }
  
  const rows = books;
  
  const booksList = async() =>{
     var response = await axios.get('https://run.mocky.io/v3/821d47eb-b962-4a30-9231-e54479f1fbdf')  .then(res => {  
        setBooks(res.data.items)
      }) .catch((error)=>{
        return error
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
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((rows,index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index} >
                        <TableCell> {rows.volumeInfo ? rows.volumeInfo.title:''} </TableCell>
                        <TableCell>{rows.volumeInfo ? rows.volumeInfo.subtitle:''}</TableCell>
                        <TableCell>{rows.volumeInfo ? rows.volumeInfo.authors:''}</TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
      </Col>
    </Row>
   </>

  );
}
