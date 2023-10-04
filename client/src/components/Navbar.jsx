import React, { useState } from 'react';
import { FaCommentAlt, FaPhone, FaVideo, FaUserAlt, FaBell, FaCog, FaEllipsisH } from 'react-icons/fa';
import Profile from './Profile';
import { useAuth } from '../context/AuthContext';
import { useChat } from '../context/ChatContext';

const Navbar = () => {
  const [modal, setModal] = useState(false);
  const { user } = useAuth();
  const { loadUser, setLoadUser } = useChat();

  const toggoleModal = () => {
    setModal(!modal);
  }

  const toggleUsers = ()=>{
    setLoadUser(!loadUser);
  }

  return (
    <div className='navbar'>
      {modal && <Profile />}
      <div className="user">
        <img src={ user.avatar.url } alt="" onClick={toggoleModal} />
      </div>
      <div className='navIconsMid'>
        <FaCommentAlt />
        <FaPhone />
        <FaVideo />
        <FaUserAlt onClick={ toggleUsers }/>
        <FaBell />
      </div>
      <div className='navIconsEnd'>
        <FaCog />
        <FaEllipsisH />
      </div>
    </div>
  )
}

export default Navbar;