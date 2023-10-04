import React, { useEffect, useState, useRef } from "react";
import Message from "./Message";
import profile from "../assets/profile.jpg";
import { MdCall, MdVideocam} from 'react-icons/md';
import Input from './Input';
import { useChat } from "../context/ChatContext";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import server from "../server";
import socketIO from "socket.io-client";
import socketServer from "../socketServer";
const socketId = socketIO(socketServer, { transports: ["websocket"] });

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [conversation, setConversation] = useState({});
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [shouldScrollToBottom, setShouldScrollToBottom] = useState(true);
  const messagesContainerRef = useRef(null);
  const { user } = useAuth();
  const { receiver, status } = useChat();

  useEffect(() => {
    socketId.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      conversation?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, conversation]);

  useEffect(()=>{
    const getAllMessages = async()=>{
      try{
        const response = await axios.get(`${server}/find-conversation/${user._id}/${receiver._id}`);
        setConversation(response.data.conversation);
        const results = await axios.get(`${server}/get-messages/${conversation._id}`);
        setMessages(results.data.messages);
      }catch(err){

      }
    }
    getAllMessages();
  },[user, receiver,conversation]);

  useEffect(() => {
    const container = messagesContainerRef.current;

    // Function to check if the user has scrolled up manually
    const hasScrolledUpManually = () => {
      if (container) {
        return container.scrollTop + container.clientHeight < container.scrollHeight;
      }
      return false;
    };

    // Scroll to the bottom when new messages arrive, unless the user has scrolled up manually
    const scrollToBottom = () => {
      if (container && shouldScrollToBottom) {
        container.scrollTop = container.scrollHeight;
      }
    };

    // Scroll to the bottom initially
    scrollToBottom();

    // Scroll to the bottom when new messages arrive
    if (shouldScrollToBottom) {
      scrollToBottom();
    }

    // Event listener to track user scrolling manually
    const handleScroll = () => {
      if (hasScrolledUpManually()) {
        setShouldScrollToBottom(false);
      } else {
        setShouldScrollToBottom(true);
      }
    };

    container.addEventListener('scroll', handleScroll);

    // Cleanup event listener on component unmount
    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, [messages, shouldScrollToBottom]);


  return (
    <div className="chat">
      <div className="chatInfo">
        <div className="chatActive">
          <img src={receiver?.avatar?.url || profile} alt="" />
          <div className="chatActiveInfo">
            <span>{ receiver?.name }</span>
            <p>{ status ? "online" : "offline" }</p>
          </div>
        </div>
        <div className="chatIcons">
          <MdVideocam />
          <MdCall />
        </div>
      </div>
      <div className="messages" ref={ messagesContainerRef }>
      {messages.length === 0 ? (
          <p style={{ textAlign: 'center', marginTop: '30%' }}>No messages yet. Start a conversation!</p>
        ) : (
          messages.map((message) => (
            <Message key={message._id} message={message} />
          ))
        )}
      </div>
      <Input conversation={ conversation } />
    </div>
  );
};

export default Messages;