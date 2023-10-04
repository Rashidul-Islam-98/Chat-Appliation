import React from 'react';
import Sidebar from '../components/Sidebar';
import Messages from '../components/Messages';
import Navbar from '../components/Navbar';
import { useChat } from '../context/ChatContext';

const Home = () => {
  const { open } = useChat();
  return (
    <div className="homeContainer">
      <Navbar />
      <Sidebar />
      {open && <Messages />}
    </div>
  )
}

export default Home;