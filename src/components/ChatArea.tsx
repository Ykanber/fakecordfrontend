import React, {useState} from "react";
import type {Message} from "../types/common.ts";

interface Props {
    selectedChannel: string;
}

const ChatArea: React.FC<Props> = ({selectedChannel}) => {

    const [messages, setMessages] = useState<Message[]>([
        {author: 'Yavuz', text: 'Merhaba! Nasılsın?'},
        {author: 'Ali', text: 'İyiyim, teşekkürler! Sen nasılsın?'}
    ])

    const [input, setInput] = useState('');

    const handleSend = () => {

        if (!input.trim) return;

        setMessages(prevState => [...prevState, {author: "Sen", text: input}]);
        setInput('');
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    }


    return (
        <main className="chat-window">
            <div className="channel-header-bar">
                <span className="hash">#</span> {selectedChannel}
            </div>

            <div className="messages">
                {messages.map((msg, idx) => (
                    <div key={idx} className="message">
                        <div className="message-author">{msg.author}</div>
                        <div className="message-text">{msg.text}</div>
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