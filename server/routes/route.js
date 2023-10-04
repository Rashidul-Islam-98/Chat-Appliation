const express = require("express");
const { getUsers, registerUser, loginUser, updateUser, getUser } = require("../controller/user");
const { createCoversation, updateLastMessage, findConversation, getConversations } = require("../controller/conversation");
const { createMessage, getMessages } = require("../controller/messages");
const route = express.Router();

route.get("/users", getUsers);
route.get("/user/:userId", getUser);
route.post("/register", registerUser);
route.post("/login", loginUser);
route.put("/update-user/:id", updateUser);

route.post("/create-conversation",createCoversation);
route.get("/get-conversations/:userId",getConversations);
route.get("/find-conversation/:firstId/:secondId",findConversation);
route.put("/update-conversation/:conversationId",updateLastMessage);

route.post("/create-message",createMessage);
route.get("/get-messages/:conversationId",getMessages);

module.exports = route;