import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import axios from 'axios';

import CreateTask from '../CreateTask/CreateTask';
import Dashboard from '../Dashboard/Dashboard';
import Login from '../Login/Login';
import Navbar from '../Navbar/Navbar';
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
  const jwt = localStorage.getItem('token');
  const [token, setToken] = useState(jwt || null);
  const getJwt = async() => {
    const {data } = await axios.get(`${api}/jwt`);
  }
  let loggedIn = true;
  if (!token) {
    loggedIn = false;
  }
  return (
    <div className="App">

      <Navbar loggedIn={loggedIn}/>

      <header className="App-header">
        <BrowserRouter>
          <Switch>

            <Route path="/create_task">
              <CreateTask />
            </Route>

            <Route path="/dashboard">
              <Dashboard />
            </Route>

            <Route path="/login" component={Login}>
              <Login setToken={setToken} loggedIn={loggedIn}/>
            </Route>

            <Route path="/create_review">
              <CreateReview />
            </Route>

            <Route path="/registeration">
              <Registration />
            </Route>

            <Route path='/transaction'>
                <Transaction />
            </Route>

            <Route path="/feed">
              <Feed />
            </Route>

            <Route path="/workspace">
              <Workspace />
            </Route>
            
            <Route path="/viewprofile">
              <ViewProfile />
            </Route>

          </Switch>
        </BrowserRouter>

      </header>
      
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
