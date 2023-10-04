import React, { useState } from "react";
const Search = () => {
  const [user,setUser] = useState({});
  const [name,setName] = useState("");
  const searchingUser = ()=>{
    setUser({});
  }
  return (
    <div className="search">
      <div className="searchForm" onClick={searchingUser}>
        <input
          type="text"
          placeholder="Find a user"
          onChange={(e)=>setName(e.target.value)}
          value={name}
        />
      </div>
      {user && (
        <div className="userChat">
          <img src={user.photoURL} alt="" />
          <div className="userChatInfo">
            <span>{user.displayName}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;