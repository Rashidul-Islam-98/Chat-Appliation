import React from 'react';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user, logoutUser } = useAuth();
  return (
    <div className='userContainer'>
        <div className='userFunction'>
            <span>General</span>
            <span>Account</span>
            <span>Chats</span>
            <span>Personalization</span>
            <span onClick={()=>logoutUser(user)}>Logout</span>
        </div>
        <div className='userDetails'>
            <img src = { user.avatar.url } alt="" />
            <span>{ user.name }</span>
            <span>{ user.email }</span>
        </div>
    </div>
  )
}

export default Profile;