import React from 'react';
import profile from '../assets/profile.jpg';
import server from '../server';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useChat } from '../context/ChatContext';

const User = ({ temp }) => {
    const { user } = useAuth();
    const { startChat } = useChat();

    const createConversation = async () => {
        try {
            const response = await axios.get(`${server}/find-conversation/${user._id}/${temp.id}`);
            console.log(response);
            if (!response.data.conversation) {
                await axios.post(`${server}/create-conversation`, {
                    groupTitle: user._id + temp._id,
                    senderId: user._id,
                    receiverId: temp._id
                });
            }
            startChat(temp);
        } catch (err) {
        }
    }
    return (
        <div className="user" onClick={createConversation}>
          <img src={temp.avatar?.url || profile} alt="" />
          <span>{temp.name}</span>
        </div>
    )
}

export default User;