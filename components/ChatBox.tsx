import React, { useEffect, useState } from 'react';
import { useChannel } from "ably/react";

export default function ChatBox() {

    let inputBox = null;
    let messageEnd = null;

    const [messageText, setMessageText] = useState("");
    const [receivedMessages, setMessages] = useState([]);     
    const messageTextIsEmpty = messageText.trim().length === 0;

    /*
    const { channel, ably } = useChannel("chat-demo", (message) => {
        const history = receivedMessages.slice(-199);
        setMessages([...history, message]);
      });

    const sendChatMessage = (messageText) => {
    channel.publish({ name: "chat-message", data: messageText });
    setMessageText("");
    inputBox.focus();
    }
    */

    const handleFormSubmission = (event) => {
        event.preventDefault();
        sendChatMessage(messageText);
      }


    /*
    const messages = receivedMessages.map((message, index) => {
        const author = message.connectionId === ably.connection.id ? "me" : "other";
        return <span key={index} data-author={author}>{message.data}</span>;
      });
    */


    return (
  <div className='flex flex-col items-start justify-between p-4 bg-white h-72 rounded-lg'>
    <div>
      MENSAGE DE TESTE: colocar variavel message dps
      <div ref={(element) => { messageEnd = element; }}></div>
    </div>
    <div className="self-start">
    <form onSubmit={handleFormSubmission} >
      <input
        className='flex h-10 w-full rounded-md border border-[#e5e7eb] px-3 py-2 text-sm placeholder-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#9ca3af] disabled:cursor-not-allowed disabled:opacity-50 text-[#030712] focus-visible:ring-offset-2'
        ref={(element) => { inputBox = element; }}
        value={messageText}
        placeholder="Type a message..."
        onChange={e => setMessageText(e.target.value)}
      ></input>
      <button className="inline-flex items-center justify-center rounded-md text-sm font-medium text-[#f9fafb] disabled:pointer-events-none mt-3 bg-black hover:bg-[#111827E6] h-10 px-4 py-2" type="submit" disabled={messageTextIsEmpty}>Send</button>
    </form>
    </div>
  </div>

  )
  }