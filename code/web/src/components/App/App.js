import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import axios from 'axios';

import Chat from '../Chat/Chat'
import CreateTask from '../CreateTask/CreateTask';
import Landing from '../Landing/Landing'
import Login from '../Login/Login';
import Logout from '../Login/Logout';
import NavbarV2 from '../Navbar/NavbarV2';
import CreateReview from '../CreateReview/CreateReview'
import Registration from '../Registration/Registration'
import Transaction from '../Transaction/Transaction'
import Feed from '../Feed/Feed';
import Footer from '../Footer/Footer';
import Workspace from '../Workspace/Workspace'
import ViewProfile from '../ViewProfile/ViewProfile'
import EditProfile from '../ViewProfile/EditProfile'
import useUserData from './userData'

import './App.css';

const api = process.env.REACT_APP_DATA_API;

axios.interceptors.request.use(
  config => {
    const { origin } = new URL(config.url);
    const allowedOrigins = [api];
    const token = localStorage.getItem('token');

    if (allowedOrigins.includes(origin)) {
      config.headers.authorizations = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

const getUser = () => {
  const userData = JSON.parse(localStorage.getItem('user'));
  return userData;
};

/*const saveUser = (userData) => {
  localStorage.setItem('user', JSON.stringify(userData));
};*/

function App() {
  const user = getUser();

  return (
    <div className="App">


      <header>
      <NavbarV2 />
      </header>

      <header className="App-header">
        <div className="App-body">
      
        <BrowserRouter>
          <Switch>

          <Route path="/chat" component={Chat}/>
          <Route path="/create_task" component={CreateTask}/>
          <Route path="/login" component={Login}/>
          <Route path="/logout" component={Logout}/>
          <Route path="/create_review" component={CreateReview}/>
          <Route path="/registeration" component={Registration}/>
          <Route path="/transaction" component={Transaction}/>
          <Route path="/feed" component={Feed}/>
          <Route path="/workspace" component={Workspace}/>
          <Route path="/viewprofile" component={ViewProfile}/>
          <Route path="/editprofile" component={EditProfile}/>
          <Route path="/" component={Landing}/>

          </Switch>
        </BrowserRouter>
    </div>
    </header>

      
      {/* <footer>
        <p>2021 Team 011_6 ERROR404</p>
        <a
          className="githubLink"
          href="https://github.com/CSCI-3308-CU-Boulder/3308SP21_011_6"
          target="_blank"
          rel="noopener noreferrer"
        >
          Code in github
        </a>
      </footer> */}

      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
