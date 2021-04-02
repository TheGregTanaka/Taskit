import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import axios from 'axios';

import Chat from '../Chat/Chat'
import CreateTask from '../CreateTask/CreateTask';
import Dashboard from '../Dashboard/Dashboard';
import Landing from '../Landing/Landing'
import Login from '../Login/Login';
import Logout from '../Login/Logout';
import Navbar from '../Navbar/Navbar';
import NavbarV2 from '../LandingPage/NavbarV2';
import CreateReview from '../CreateReview/CreateReview'
import Registration from '../Registration/Registration'
import Transaction from '../Transaction/Transaction'
import Feed from '../Feed/Feed';
import Workspace from '../Workspace/Workspace'
import ViewProfile from '../ViewProfile/ViewProfile'

import './App.css';

//TODO move to env var
const api = 'http://localhost:3200';

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

function App() {
  const userData = JSON.parse(localStorage.getItem('user'));
  const [user, setUser] = useState(userData || null);

  //let loggedIn = true;
  let loggedIn = false;
  if (user) {
    loggedIn = true;
  }
  return (
    <div className="App">

      {/* <Navbar loggedIn={loggedIn}/> */}
      <NavbarV2 loggedIn={loggedIn} />

      <header className="App-header">
        <Navbar loggedIn={loggedIn}/>
      </header>
      <div className="App-body">
      
        <BrowserRouter>
          <Switch>

          <Route path="/landing" component={Landing}/>
          <Route path="/chat" component={Chat}/>
          <Route path="/create_task" component={CreateTask}/>
          <Route path="/dashboard" component={Dashboard}/>
          <Route path="/login" component={Login}>
            <Login setUser={setUser} loggedIn={loggedIn}/>
          </Route>
          <Route path="/logout" component={Logout}/>
          <Route path="/create_review" component={CreateReview}/>
          <Route path="/registeration" component={Registration}/>
          <Route path="/transaction" component={Transaction}/>
          <Route path="/feed" component={Feed}/>
          <Route path="/workspace" component={Workspace}/>
          <Route path="/viewprofile" component={ViewProfile}/>
          <Route path="/" component={ViewProfile}/>

          </Switch>
        </BrowserRouter>
    </div>

      
      <footer>
        <p>2021 Team 011_6 ERROR404</p>
        <a
          className="githubLink"
          href="https://github.com/CSCI-3308-CU-Boulder/3308SP21_011_6"
          target="_blank"
          rel="noopener noreferrer"
        >
          Code in github
        </a>
      </footer>
    </div>
  );
}

export default App;
