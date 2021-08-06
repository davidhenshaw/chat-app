import React, { useState, useEffect } from 'react'
import { useSocket } from '../contexts/SocketProvider';

function ConversationBox(props) {
    const socket = useSocket();
    const [messages, setMessages] = useState([]);

    useEffect( () => {
        if(!socket) return;

        socket.on('message', (msg) => receiveMessage(msg))

        return () => socket.off('message')
    }, [socket])

    const receiveMessage = (msg) =>
    {
        setMessages( (curr) => [...curr, msg] );
    }

    let conversation = messages.map( (msg, i) => <h3 key={i}>{msg}</h3>)

    return (
        <div>
            {conversation}
        </div>
    )
}

export default ConversationBox
