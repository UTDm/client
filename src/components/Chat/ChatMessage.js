import React from "react";

import './ChatRoom.css';
function ChatMessage (props) {
    const { message, userId } = props;

    //classify message type
    const messageClass = message.from === userId ? 'sent' : 'received';

    //TODO: Display name of message'owner
    return (
        <div className={`message ${messageClass}`}>
            <img src={'data:image/png;base64,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'} />
            <p>{message.context}</p>
        </div>
    )
}

export default ChatMessage;