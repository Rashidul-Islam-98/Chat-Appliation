import React, { useEffect, useState } from "react";
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { useChat} from "../context/ChatContext";
import { format } from "timeago.js";
import server from '../server';
import socketServer from '../socketServer';
import profile from '../assets/profile.jpg';
import socketIO from "socket.io-client";
const socketId = socketIO(socketServer, { transports: ["websocket"] });

const Chat = ({ chat }) => {
  const [receiver,setReceiver] = useState({});
  const [onlineUsers,setOnlineUsers] = useState([]);
  const [online, setOnline] = useState(false);
  const { user } = useAuth();
  const { status, startChat, setStatus } = useChat();
  const receiverId = chat.members[0]===user._id ? chat.members[1] : chat.members[0];

  useEffect(() => {
    if (user) {
      socketId.emit("addUser", user?._id);
      socketId.on("getUsers", (data) => {
        setOnlineUsers(data);
      });
    }
  }, [user]);


  useEffect(() => {
    const result = onlineUsers.find((temp)=>temp.userId===receiverId);
    if(result){
      setOnline(true);
    }
  }, [onlineUsers,receiverId]);

  useEffect(()=>{
    const findReceiver = async()=>{
      try{
        const response = await axios.get(`${server}/user/${receiverId}`);
        setReceiver(response.data.user);
      }catch(err){

      }
    }
    findReceiver();
  },[receiverId]);

  console.log(status);
  
  const handleChatContext = ()=>{
    startChat(receiver);
    setStatus(online);
  }

  console.log(status);

  return (
    <div className="userChat" onClick={handleChatContext}>
      <img src={ receiver.avatar?.url || profile } alt="" />
      {online && <div className="onlineCheck"></div>}
      <div className="userChatInfo">
        <h3>{receiver.name}</h3>
        <span>{chat.lastMessage}</span>
        <p>{format(chat.updatedAt)}</p>
      </div>
    </div>
  );
};

export default Chat;