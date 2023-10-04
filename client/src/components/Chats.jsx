import React, { useEffect, useState } from "react";
import server from '../server';
import { useAuth } from '../context/AuthContext';
import Chat from "./Chat";
import axios from 'axios';

const Chats = () => {
  const [chats, setChats] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const getConversation = async () => {
      try {
        const response = await axios.get(`${server}/get-conversations/${user?._id}`);
        setChats(response.data.conversations);
      } catch (error) {
      }
    };
    getConversation();
  }, [user]);


  return (
    <div className="chats">
        {chats && chats.map((chat) => (
          <Chat key={chat._id} chat={chat} />
        ))
        }
    </div>
  );
};

export default Chats;