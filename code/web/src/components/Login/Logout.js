import React from 'react';
import { Redirect } from 'react-router-dom';

export default function Logout({setUser}) {
  localStorage.removeItem('user');
  //setUser('');
  return (<Redirect to="/login" />);
}
