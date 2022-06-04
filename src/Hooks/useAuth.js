import AuthRepository from '../Api/AuthRepository';
import cookies from "js-cookie";

import React,{useContext, useState} from 'react';
import { notification } from "antd";
import { SmileOutlined } from "@ant-design/icons";
import { useHistory } from 'react-router-dom';
import {UserContext} from '../App';

export default function useAuth() {
  const history = useHistory();
  const {state , dispatch} = useContext(UserContext); 

    return {
        getUserRegister: async (data) => {
            // console.log('data',data)
            var responseData = await AuthRepository.UserRegister(data);
            // console.log(responseData);
            if (responseData.status === 200) {             

                notification.open({
                  message: "Register",
                  description: "Registration SuccessFully...!!",
                  icon: <SmileOutlined style={{ color: "#108ee9" }} />,
                });
                  history.push('/login');
                return true
              } else{
                notification.open({
                  message: "Error",
                  description: "Registration Failed...!",
                  icon: <SmileOutlined style={{ color: "#108ee9" }} />,
                });
                 history.push('/register');
                return false
              }
       },

       getUserLogin: async (data) => {   

        var responseData = await AuthRepository.UserLogin(data);
        //  console.log(responseData);
        if (responseData.status === 200) {
          notification.open({
            message: "Success",
            description: "Login Successfully...!!",
            icon: <SmileOutlined style={{ color: "#108ee9" }} />,
          });
          cookies.set('token', responseData.data.token)
          localStorage.setItem("userId", responseData.data.user.id);
          dispatch({type:"USER", payload:true})
          history.push('/');
          return  responseData.data;

          }

          else {
            notification.open({
              message: "Warning",
              description: "Login Failed...!!",
              icon: <SmileOutlined style={{ color: "#108ee9" }} />,
            });
            history.push('/login');
            return false
          }
        },
        getBookRegister: async (data) => {
          // console.log('data',data)
          var responseData = await AuthRepository.BookRegister(data);
          // console.log(responseData);
          if (responseData.status === 200) {             

              notification.open({
                message: "Register",
                description: "Book Added SuccessFully...!!",
                icon: <SmileOutlined style={{ color: "#108ee9" }} />,
              });
                history.push('/book_listing');
              return true
            } else{
              notification.open({
                message: "Error",
                description: "Failed...!",
                icon: <SmileOutlined style={{ color: "#108ee9" }} />,
              });
               history.push('/book_register');
              return false
            }
     },
        userBooks: async (data) => {
          var responseData = await AuthRepository.userBooksListing(data);
          // console.log(responseData);

          if (responseData.status === 200) {
              return responseData.data;
          }
          return false;
        },

        getBookUpdate: async (data) => {
          // console.log('data',data)
          var responseData = await AuthRepository.bookUpdate(data);
          // console.log(responseData);
          if (responseData.status === 200) {             

              notification.open({
                message: "Updated",
                description: "Book Updated SuccessFully...!!",
                icon: <SmileOutlined style={{ color: "#108ee9" }} />,
              });
                history.push('/book_listing');
              return true
            } else{
              notification.open({
                message: "Error",
                description: "Failed...!",
                icon: <SmileOutlined style={{ color: "#108ee9" }} />,
              });
               history.push('/book_listing');
              return false
            }
        },

        // getBookDelete: async (data) => {
        //        console.log('data',data)
        //   var responseData = await AuthRepository.bookDelete(data);
        //        console.log(responseData);
        //   if (responseData.status === 200) {             

        //       notification.open({
        //         message: "Deleted",
        //         description: "Book Deleted SuccessFully...!!",
        //         icon: <SmileOutlined style={{ color: "#108ee9" }} />,
        //       });
        //         history.push('/book_listing');
        //       return true
        //     } else{
        //       notification.open({
        //         message: "Error",
        //         description: "Failed...!",
        //         icon: <SmileOutlined style={{ color: "#108ee9" }} />,
        //       });
        //        history.push('/book_listing');
        //       return false
        //     }
        // },
   }
        
  }