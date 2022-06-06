import React,{useContext,useState,useEffect} from 'react';
import { Menu , Button , Drawer } from 'antd';
import './navigation_style.css';
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import {UserContext} from '../../../App';
import { useHistory } from 'react-router-dom';

const RightMenu = () => { 
  const {state , dispatch} = useContext(UserContext);
  const [isLogin,setIsLogin] =useState(false)
  const history = useHistory();

  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };


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
          <Link to="/facutly">Add Faculty</Link>
        </Menu.Item>
        <Menu.Item  className='list'>
          <Link to="/facutly_list">FacultyList</Link>
        </Menu.Item>
        <Menu.Item  className='list'>
          <Button color="inherit" onClick={showDrawer}>
          Profile
          </Button>
        </Menu.Item>
        <Menu.Item  className='list'>
           <Button color="inherit" onClick={onLogout}>Logout</Button>
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
      <Drawer title="Profile" placement="right" onClose={onClose} visible={visible}>
        <h1>{LocalUserId}</h1>
        <strong style={{fontSize:'20px'}}>Contact: <span>+918516832569</span></strong><br /><br />
        <strong style={{fontSize:'20px'}}>Address: <span> Vijay Nagar Indore (473255)</span></strong><br /><br />
         <span> <strong style={{fontSize:'20px'}}>About:</strong> Lorem Ipsum is simply dummy text of
          the printing and typesetting industry. Lorem Ipsum has
          been the industry's standard dummy text ever since the 1500s,
          when an unknown printer took a galley of type and scrambled it 
          to make a type specimen book. It has survived not only five centuries,
        </span>
      </Drawer>
     </>
    );
  }

export default RightMenu;