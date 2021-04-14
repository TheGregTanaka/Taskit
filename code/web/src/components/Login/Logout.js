import React from 'react';
import { Redirect } from 'react-router-dom';
import { useHistory } from 'react-router';

export default function Logout() {
  localStorage.removeItem('user');
  return (<Redirect to="/login" />);
}
