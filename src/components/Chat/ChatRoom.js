import React, { useEffect, useState, useRef } from "react";
import io from "socket.io-client";

import './ChatRoom.css';
import queryString from 'query-string';
import ChatMessage from './ChatMessage';

let socket;

const ChatRoom = ({location}) => {

    //State
    const [name, setName] = useState('');
    const [roomId, setRoomId] = useState('');
    const [users, setUsers] = useState('');
    const [inputMessage, setInputMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [userId, setUserId] = useState('');
    const ENDPOINT = 'localhost:5000';
    const dummy = useRef();
    
    //Send message method
    const sendMessage = async (e) => {
        e.preventDefault();
        
        socket.emit('sendMessage', inputMessage);
        setInputMessage('');
        dummy.current.scrollIntoView({ behavior: 'smooth' });
    }

    //re-render this block whenever ENDPOINT change
    useEffect(() => {
        const { name, room } = queryString.parse(location.search);

        socket = io(ENDPOINT);
        //TODO: create a persistent userId instead of using socket.id
        socket.on('connect' , () => {
            setUserId(socket.id)
        });

        setName(name)
        setRoomId(room)

        socket.emit('join', {name: name, roomId: roomId})
    }, [ENDPOINT]);

    //TODO: remove current user and navigate to Join page

    //Update message list and user list
    useEffect(() => {
        socket.on('newMessage', newMessage => {
            setMessages(oldMessages => [ ...oldMessages, newMessage ]);
            //TODO: at the begin messages list did not include the very first message
        });
        
        socket.on("getUserList", ( users ) => {
          setUsers(users);
        });
    }, []);

    //TODO: Scroll bar is too big
    //TODO: Add send image feature
    return (
        <div className="chatroom">
            <main>
                {messages.map(message => (
                    <ChatMessage
                        key={message.id}
                        message={message}
                        userId={userId}
                    ></ChatMessage>
                ))}
                <span ref={dummy}></span>
            </main>
            
            <form onSubmit={sendMessage}>
                <input value={inputMessage} onChange={(e) => setInputMessage(e.target.value)} placeholder="say something nice" />

                <button type="submit" disabled={!inputMessage}>🕊️</button>
            </form>
        </div>
    );
}

export default ChatRoom;
