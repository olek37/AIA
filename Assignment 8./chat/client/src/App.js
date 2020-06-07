import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import Input from "./ChatInput"
import { useBeforeunload } from 'react-beforeunload'
const socket = io("http://localhost:3000");

export default function App() {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  
  useBeforeunload(() => socket.emit('message', { userName, message: ' has left the chat' }))

  useEffect(() => {
    socket.on('message', data => {
      setMessages(m => [...m, data]);
    });
  }, []);

  useEffect(() => {
    socket.on('user', data => {
      setUsers(u => [...u, data]);
    });
  }, []);

  const send = (message) => {
    if(!loggedIn) {
      socket.emit('user', message);
      socket.emit('message', { userName: message, message: ' has joined the chat' });
      setUserName(message)
      setLoggedIn(true)
    } else {
      socket.emit('message', { userName, message });
    }
  }

  if(!loggedIn) return (
    <div>
      <p>Active users</p>
      <ul>
        {users.map(u => <li>{u}</li>)}
      </ul>
      <Input send={ send } buttonText='Log in' />
    </div>
  )

  return (
    <div>
      <div>
        <ul>
          {messages.map(m => <li>{`${m.userName}: ${m.message}`}</li>)}
        </ul>
        <Input send={ send } buttonText='Send' />
      </div>
      <div>
        <p>Active users</p>
        <ul>
          {users.map(u => <li>{u}</li>)}
        </ul>
      </div>
    </div>
  );
}