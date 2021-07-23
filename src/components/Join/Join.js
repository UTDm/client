import React, { useState } from 'react';
import { Link } from "react-router-dom";

import './Join.css';
import { v4 as uuidv4 } from 'uuid';

export default function Join() {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const uid = uuidv4();

  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">UTDm</h1>
        <div>
          <input placeholder="Name" className="joinInput" type="text" onChange={(event) => setName(event.target.value)} />
        </div>
        <div>
          <input placeholder="Room" className="joinInput mt-20" type="text" onChange={(event) => setRoom(event.target.value)} />
        </div>
        <Link onClick={e => (!name || !room) ? e.preventDefault() : null} to={`/chatroom?name=${name}&uid=${uid}&room=${room}`}>
          <button className={'button mt-20'} type="submit">Sign In</button>
        </Link>
      </div>
    </div>
  );
}