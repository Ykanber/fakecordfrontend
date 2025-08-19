import React, {useEffect, useState} from "react";
import type {Channel} from "../types/common.ts";
import {MessageApi} from "../api/message.ts";
import type {Message} from "../types/message.ts";

interface Props {
    selectedChannel: Channel | undefined;
}

const ChatArea: React.FC<Props> = ({selectedChannel}) => {

    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);

    const handleSend = () => {

        if (!input.trim) return;
        MessageApi.sendMessage({
            channelId: selectedChannel ? selectedChannel.channelId : 1,
            messageText: input
        }).then(() => setInput(''))

    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    }

    const getChannelMessages = async () => {
        const messages = await MessageApi.getChannelMessages(1, selectedChannel ? selectedChannel.channelId : 1);
        if (messages.length !== 0) {
            setMessages(messages);
        }
    }

    useEffect(() => {
        getChannelMessages().then(null);
    }, [selectedChannel]);


    return (
        <main className="chat-window">
            <div className="channel-header-bar">
                <span className="hash">#</span> {selectedChannel?.channelName}
            </div>

            <div className="messages">

                {messages && messages.map((msg, idx) => (
                    <div key={idx} className="message">
                        <div className="message-author">{msg.author}</div>
                        <div className="message-text">{msg.messageText}</div>
                        <div className="message-text">{msg.createTime}</div>
                    </div>
                ))}
            </div>

            <div className="message-input">
                <input
                    type="text"
                    placeholder="Mesajınızı yazın..."
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
            </div>
        </main>
    );
}

export default ChatArea;