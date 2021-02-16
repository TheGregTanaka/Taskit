import React, { useState} from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import './Login.css';

async function loginUser(credentials) {
  //TODO make call to node API
  
  let json = {
    "token": "aoeuhjkl"
  };
  return json;
}

export default function Login({ setToken, loggedIn }) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    const token = await loginUser({ username, password });
    setToken(token);
  }
  if (loggedIn) {
    return (<Redirect to="/dashboard" />);
  } else {
    return (
      <div className="login-wrapper">
        <header>Login</header>
        <form onSubmit={handleSubmit}>
          <label>
            <p>Email</p>
          <input type="text" 
            placeholder="Email" 
            onChange={e => setUserName(e.target.value)}/>
          </label>
          <label>
            <p>Password</p>
          <input type="password" 
            placeholder="Password"
            onChange={e => setPassword(e.target.value)}/>
          </label>
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    );
  }
}


Login.propTypes = {
  setToken: PropTypes.func.isRequired
}
