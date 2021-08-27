import React from 'react'
import { useState } from 'react';
import { Button, Form } from 'react-bootstrap'
import { useSocket } from '../contexts/SocketProvider';
import ConversationBox from './ConversationBox';

function ChatWindow() {
    const [message, setMessage] = useState("");
    const socket = useSocket();

    function sendMessage(e)
    {
        e.preventDefault();

        socket.emit('client-message', message);

        clear();
    }

    function clear()
    {
        setMessage("");
    }

    function onChange(e)
    {
        setMessage(e.target.value);
    }

    return (
        <div className="chat-window">
            <ConversationBox />

            <Form onSubmit={sendMessage}>
                <Form.Control
                type="input"
                placeholder="Write a message!"
                value={message}
                onChange={onChange}
                />
                <Button 
                type="submit"
                variant="primary">
                    Send    
                </Button>
            </Form>
        </div>
    )
}

export default ChatWindow
