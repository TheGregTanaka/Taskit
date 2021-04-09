import React from 'react';
import { Redirect } from 'react-router-dom';

export default function Logout() {
  localStorage.removeItem('user');
  return (<Redirect to="/login" />);
}
