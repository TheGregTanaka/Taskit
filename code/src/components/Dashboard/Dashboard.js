import React from 'react';
import logo from '../../logo.svg';
import '../App/App.css';

export default function Dashboard() {
  //TODO delete testing
  const user = JSON.parse(sessionStorage.getItem('user'));
  const id = user ? user.id : 'null';
  const em  = user ? user.email : 'null';
  return (
    <div>
    <p>The current user is {id} {em}</p>
      <img src={logo} className="App-logo" alt="logo" />
      <h1>TaskIt</h1>
    </div>
  );
}
