import React from 'react';
import logo from '../../image/taskitthumbnail.png';
import '../App/App.css';

export default function Dashboard() {
  return (
    <div>
      <img src={logo} className="App-logo" alt="logo" />
      <h1>TaskIt</h1>
    </div>
  );
}
