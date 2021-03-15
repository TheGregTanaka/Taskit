import React, { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';


import CreateTask from '../CreateTask/CreateTask';
import Dashboard from '../Dashboard/Dashboard';
import Login from '../Login/Login';
import Navbar from '../Navbar/Navbar';
import Registration from '../Registration/Registration'
import RateWorker from '../RateWorker/RateWorker'
import Feed from '../Feed/Feed';
import Workspace from '../Workspace/Workspace'
import EditProfile from '../EditProfile/EditProfile'



import './App.css';


function App() {
  const [token, setToken] = useState();
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

            <Route path="/registeration">
              <Registration />
            </Route>

            <Route path="/rate_worker">
              <RateWorker />
            </Route>

            <Route path="/feed">
              <Feed />
            </Route>

            <Route path="/workspace">
              <Workspace />
            </Route>
            
            <Route path="/editprofile">
              <EditProfile />
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
