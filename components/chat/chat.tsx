import React, { useState, useEffect, useRef } from 'react';
import "./chat.module.css"

export default function Chat({ myPeerId, messages, sendMessage, close }:any) {

    const inputRef :any= useRef(null);
    const messageBoxEndRef:any = useRef(null);
    const [message, setMessage] = useState('');
    const send = () => {
        inputRef.current.focus();
        console.log(myPeerId);
        if (message === '') return;
        sendMessage(myPeerId, message);
        setMessage('');
    }

    useEffect(() => {
        inputRef.current.focus();
    }, [])

    useEffect(() => {
        messageBoxEndRef.current.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
    }, [messages])

    return (
        <div className="chat" onClick={() => inputRef.current.focus()}>
            <div className="chat-top">
                <h1>Chat</h1>
                <div className="chat-close-button" onClick={close}>x</div>
            </div>
            <div className="chat-message-box">
                {messages && messages.map((msg:any, i:any) => {
                    return (
                        <div key={i} className={`chat-message ${msg.peerId === myPeerId ? "my-message" : "remote-message"}`}>
                            <span>{msg.peerId}</span>
                            <br />
                            <span>{msg.message}</span>
                        </div>
                    )
                })}
                <div ref={messageBoxEndRef}></div>
            </div>
            <div className="chat-send-box">
                <input ref={inputRef}
                    type="text"
                    value={message}
                    onChange={event => setMessage(event.target.value)}
                    onKeyDown={event => {
                        if (event.key === "Enter") send();
                    }}
                />
                <button onClick={() => send()}>sdfg</button>
            </div>
        </div>
    )
}