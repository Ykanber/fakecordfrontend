import React, {useState} from "react";
import {MessageApi} from "../../api/message.ts";
import type {Channel} from "../../types/common.ts";


interface Props {
    selectedChannel?: Channel;
}

const MessageInput: React.FC<Props> = ({selectedChannel}) => {
    const [input, setInput] = useState('');

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    }

    const handleSend = () => {

        if (!input.trim) return;
        MessageApi.sendMessage({
            channelId: selectedChannel ? selectedChannel.channelId : 1,
            messageText: input
        }).then(() => setInput(''))

    }

    return (
        <div className="message-input">
            <input
                type="text"
                placeholder="Mesajınızı yazın..."
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
            />
        </div>
    );
}

export default MessageInput;