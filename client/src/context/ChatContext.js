import React, { createContext, useState, useContext } from "react";

const chatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [receiver, setReceiver] = useState(JSON.parse(localStorage.getItem("authReceiver")));
  const [status,setStatus] = useState();
  const [loadUser,setLoadUser] = useState(false);
  const [open, setOpen] = useState(true);



  const startChat = (userData) => {
    localStorage.setItem("authReceiver",JSON.stringify(userData));
    setReceiver(userData);
    setOpen(true);
  };

  return (
    <chatContext.Provider value={{ receiver, status, open, loadUser, startChat, setStatus,setLoadUser, setOpen }}>
      {children}
    </chatContext.Provider>
  );
};

export const useChat = () => {
  return useContext(chatContext);
};

