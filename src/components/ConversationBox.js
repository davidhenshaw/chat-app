import React, { useState, useEffect } from 'react'
import { useSocket } from '../contexts/SocketProvider';

function ConversationBox(props) {
    const socket = useSocket();
    const [messages, setMessages] = useState([]);

    useEffect( () => {
        if(!socket) return;

        socket.on('message', (msg) => receiveMessage(msg))
        socket.on('self-message', (msg) => {
            msg['self'] = true;
            receiveMessage(msg);
        })

        return () => socket.off('message')
    }, [socket])

    const receiveMessage = (msg) =>
    {
        setMessages( (curr) => [...curr, msg] );
    }

    let conversation = messages.map( (msg, i) => { 

        return(
            msg.self ?
            <SelfMessage data={msg} key={i} />
            :
            <Message data={msg} key={i} />
        )
    })

    return (
        <div>
            {conversation}
        </div>
    )
}

function Message({data})
{
    return (
        <div className="chat-bubble">
            <h3>{data.name}: {data.content}</h3>
            <p>{data.time}</p>
        </div>
    )
}

function SelfMessage({data})
{
    return (
        <div className="chat-bubble-self">
            <h3>{data.name}: {data.content}</h3>
            <p>{data.time}</p>
        </div>
    )
}

export default ConversationBox
