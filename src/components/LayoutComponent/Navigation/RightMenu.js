import React,{useContext,useState,useEffect} from 'react';
import { Menu , Button , Dropdown,  } from 'antd';
import './navigation_style.css';
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import {UserContext} from '../../../App';
import { useHistory } from 'react-router-dom';

const RightMenu = () => { 
  const {state , dispatch} = useContext(UserContext);
  const [isLogin,setIsLogin] =useState(false)
  const history = useHistory();

  useEffect(()=>{
    checkAuth()
  },[state])

  const checkAuth=()=>{
    var token = Cookies.get('token')
    if(token){
      setIsLogin(true)
    }
    else{
      setIsLogin(false)
    }
   
  }

  const onLogout = () => {
    localStorage.removeItem('data');
    localStorage.removeItem('userId');
    localStorage.removeItem('BookId');
    Cookies.remove('token');
    // window.location.reload(false);
    dispatch({type:"USER", payload:false})
    setIsLogin(false)
    // return false;
    history.push('/');
};

const  LocalUserId = localStorage.getItem('data');
// console.log("LocalUserId",LocalUserId);


const menu = (
  <Menu
    items={[
      {
        key: '1',
        label: (
          <span>{LocalUserId}</span>
        ),
      },
      {
        key: '2',
        label: (
          <Button color="inherit" onClick={onLogout}>Logout</Button>
        ),
      },
    ]}
  />
);


const RenderMenu = () => {
 if(isLogin ){
   return (
     <>
        <Menu.Item  className='list'>
          <Link to="/book_register">Create Books</Link>
        </Menu.Item>
        <Menu.Item  className='list'>
          <Link to="/book_listing">BookListing</Link>
        </Menu.Item>
        <Menu.Item  className='list'>
            <Dropdown overlay={menu} placement="bottom" arrow={{ pointAtCenter: true }}>
            <Button>Profile</Button>
         </Dropdown>
        </Menu.Item>
     </>
   )
 } else{
   return(
     <>
        <Menu.Item  className='list'>
          <Link to="/register">Register</Link>
        </Menu.Item>
        <Menu.Item  className='list'>
          <Link to="/login">Login</Link>
        </Menu.Item>
     </>
   )
 }
}
// const localUserId = localStorage.getItem('userId');
// console.log("localUserId",localUserId);
    return (
     <>
      <Menu mode="horizontal">
         <Menu.Item  className='list'>
         <Link className="navbar-brand" to="#">
         <img style={{width:'40px'}} src="https://images.fastcompany.net/image/upload/w_1280,f_auto,q_auto,fl_lossy/w_596,c_limit,q_auto:best,f_auto/fc/3034007-inline-i-applelogo.jpg" alt="" />
         </Link>
        </Menu.Item>
        <Menu.Item  className='list'>
          <Link to="/">Home</Link>
        </Menu.Item>
         <RenderMenu/>
      </Menu>
     </>
    );
  }

export default RightMenu;