import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import axios from 'axios';

import Chat from '../Chat/Chat';
import Landing from '../Landing/Landing';
import Login from '../Login/Login';
import Logout from '../Login/Logout';
import NavbarV2 from '../Navbar/NavbarV2';
import Registration from '../Registration/Registration';
import Feed from '../Feed/Feed';
import Footer from '../Footer/Footer';
import Workspace from '../Workspace/Workspace';
import ViewProfile from '../ViewProfile/ViewProfile';
import EditProfile from '../ViewProfile/EditProfile';
import useUserData from './userData';
import Payment from '../Payment/Payment';

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

function App() {
  const user = getUser(); 
  const [userProfile, setProfile] = useState(user || null)

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
          <Route path="/login" component={Login}/>
          <Route path="/logout" component={Logout}/>
          <Route path="/payment" component={Payment}/>
          <Route path="/registeration" component={Registration}/>
          <Route path="/feed" component={Feed}/>
          <Route path="/workspace" component={Workspace}/>
          <Route path="/viewprofile" component={ViewProfile}/>
          <Route path="/editprofile" component={EditProfile}/>
          <Route path="/" component={Landing}/>

          </Switch>
        </BrowserRouter>
    </div>
    </header>

      

      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
