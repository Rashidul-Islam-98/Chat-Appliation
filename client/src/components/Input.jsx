import React, { useState } from "react";
import { MdSend,MdAttachFile, MdInsertEmoticon } from 'react-icons/md';
import axios from 'axios';
import server from '../server';
import socketIO from "socket.io-client";
import socketServer from '../socketServer';
import { useAuth } from '../context/AuthContext';
import { useChat } from '../context/ChatContext';
const socketId = socketIO(socketServer, { transports: ["websocket"] });

const Input = ({ conversation }) => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const [lastMessage, setLastMessage] = useState("");
  const { user } = useAuth();
  const { receiver } = useChat();


  const handleSend = async () => {
    try{
      socketId.emit("sendMessage", {
        senderId: user?._id,
        receiverId: receiver?._id,
        text: text,
        image: img,
      });
      const response = await axios.post(`${server}/create-message`,{
        conversationId: conversation._id,
        senderId: user._id,
        text: text,
        image: img
      });
      const message = response.data.message;
      console.log(message);
      if(message.image){
        setLastMessage("photo");
      }else{
        setLastMessage(message.text);
      }
      setText("");
      updateLastMessage();
    }catch{
    }
  };

  const updateLastMessage = async () => {
    try{
      socketId.emit("updateLastMessage", {
        lastMessage: lastMessage,
        lastMessageId: user._id,
      });
  
      await axios.put(`${server}/update-conversation/${conversation._id}`,{
        lastMessage: lastMessage,
        lastMessageId: user._id
      });
    }catch(err){
    }
  };

  return (
    <div className="input">
      <div className="attach">
        <MdInsertEmoticon />
        <input
          type="file"
          style={{ display: "none" }}
          id="file"
          onChange={(e) => setImg(e.target.files[0])}
        />
        <label htmlFor="file">
          <MdAttachFile />
        </label>
      </div>
      <input
        type="text"
        placeholder="Type something..."
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <div className="sendText">
        <MdSend onClick={handleSend}/>
      </div>
    </div>
  );
};

export default Input;