import React, { useEffect, useState } from 'react';
import server from '../server';
import axios from 'axios';
import User from './User';
import { useAuth } from '../context/AuthContext';

const Users = () => {
  const [users, setUsers] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const findUsers = async () => {
      try {
        const findUsers = await axios.get(`${server}/users`);
        setUsers(findUsers.data.users);
      } catch (err) {
      }
    }
    findUsers();
  }, []);

  const filteredUsers = users.filter((temp) => temp._id !== user._id);

  return (
    <div className='users'>
      {filteredUsers.map((temp) => (
         <User temp={temp} key={temp._id} />
      )
      )}
    </div>
  )
}

export default Users;