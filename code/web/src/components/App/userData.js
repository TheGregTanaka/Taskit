import { useState } from 'react';

export default function useUserData() {
  const getUser = () => {
    const userData = JSON.parse(localStorage.getItem('user'));
    return userData;
  };
  const [user, setUser] = useState(getUser());
  const saveUser = (userData) => {
    console.log('here i am');
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  return {
    setUser: saveUser,
    user
  }
}
