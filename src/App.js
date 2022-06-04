import './App.css';
import React, {createContext, useReducer } from 'react'
import {
  BrowserRouter as Router, Route, Switch
} from "react-router-dom";
import 'antd/dist/antd.css';
import Navigation from './components/LayoutComponent/Navigation/Navbar';
import Home from './components/HomeComponent/index';
import Register from './components/RegisterComponent/register';
import Book from './components/BookComponent/book';
import BookListing from './components/BookComponent/bookListing';
import Login from './components/LoginComponent/login';
import { initialState , reducer } from './reducer/UseReducer';

export const UserContext = createContext();

const App = () => {

  const [state ,dispatch] = useReducer(reducer , initialState )

  return (

    <>
    <UserContext.Provider value={{state, dispatch}}>
         <Router>
            <Navigation />
            <Switch>
              <Route exact path="/"> <Home /></Route>
              <Route exact path="/register"> <Register /></Route>
              <Route exact path="/book_register"><Book /></Route>
              <Route exact path="/login"><Login /></Route>
              <Route exact path="/book_listing"><BookListing /></Route>
            </Switch>
         </Router>
    </UserContext.Provider>
    
    </>
  );
}

export default App;
