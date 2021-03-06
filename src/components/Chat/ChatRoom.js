import React, { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import { Link } from "react-router-dom";

import './ChatRoom.css';
import queryString from 'query-string';
import ChatMessage from './ChatMessage';

let socket;

const ChatRoom = ({location}) => {

    //State
    const [name, setName] = useState('');
    const [course, setCourse] = useState('');
    const [users, setUsers] = useState('');
    const [inputMessage, setInputMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [userId, setUserId] = useState('');
    const ENDPOINT = 'localhost:5000';
    const dummy = useRef();
    
    //Send message method
    const sendMessage = async (e) => {
        e.preventDefault();
        
        socket.emit('sendMessage', {context: inputMessage, from: userId});
        setInputMessage('');
        dummy.current.scrollIntoView({ behavior: 'smooth' });
    }

    //Leave room method
    const leaveRoom = async() => {
        socket.emit('disconnected', userId);
        socket.off();
    }

    useEffect(() => {
        window.addEventListener("beforeunload", leaveRoom); 
    });

    //re-render this block whenever ENDPOINT change
    useEffect(() => {
        const { name, uid, course } = queryString.parse(location.search);

        socket = io(ENDPOINT);
        
        setName(name);
        setUserId(uid);
        setCourse(course);
        
        socket.emit('join', {name: name, userId: uid, course: course});
    }, [ENDPOINT, location.search]);

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
        <div>
            <header>
                <h1>??????????????</h1>
                <Link onClick={leaveRoom} to={`/`}>
                    <button className={'leaveRoom'} type="button">Leave Room</button>
                </Link>
            </header>

            <section>
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

                        <button type="submit" disabled={!inputMessage}>???????</button>
                    </form>
                </div>
            </section>

        </div>

    );
}

export default ChatRoom;
