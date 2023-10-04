import React from "react";
import { useAuth } from '../context/AuthContext';
import { format } from "timeago.js";
const Message = ({ message }) => {
  const { user } = useAuth();

  return (
    <div className={message.senderId===user._id ? "senderMessage" : "receiverMessage"}>
      <div className={message.senderId===user._id ? "senderContent" : "receiverContent"}>
        {message.image && <img src = {message.image.url} alt =" "/>}
        <span>{ message.text }</span>
        <p>{format(message.createdAt)}</p>
      </div>
    </div>
  );
};

export default Message;