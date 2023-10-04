import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("authUser")));

  const loginUser = (userData) => {
    localStorage.setItem("authUser",JSON.stringify(userData));
    setUser(userData);
  };

  const logoutUser = () => {
    localStorage.removeItem("authUser");
    setUser(null);
  };
  

  return (
    <AuthContext.Provider value={{ user,  loginUser, logoutUser}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

