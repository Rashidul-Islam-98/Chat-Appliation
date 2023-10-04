import React from "react";
import Search from "./Search";
import Chats from "./Chats";
import Users from "./Users";
import { useChat } from "../context/ChatContext";

const Sidebar = () => {
  const { loadUser } = useChat();
  return (
    <div className="sidebar">
      <Search/>
      {loadUser ? (<Users />) : (<Chats />)}
    </div>
  );
};

export default Sidebar;