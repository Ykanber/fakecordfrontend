import React, {useCallback, useEffect, useState} from "react";
import type {Message} from "../../types/message.ts";
import {MessageApi} from "../../api/message.ts";
import type {Channel} from "../../types/common.ts";

interface Props {
    selectedChannel?: Channel;
}

const MessageList: React.FC<Props> = ({selectedChannel}: Props) => {

    const [messages, setMessages] = useState<Message[]>([]);

    const getChannelMessages = useCallback(async () => {
        const messages = await MessageApi.getChannelMessages(1, selectedChannel ? selectedChannel.channelId : 1);
        if (messages.length !== 0) {
            setMessages(messages);
        }
    }, [selectedChannel]);

    useEffect(() => {
        getChannelMessages().then(null);
    });

    return (
        <>
            <div className="channel-header-bar">
                <span className="hash">#</span> {selectedChannel?.channelName}
            </div>

            <div className="messages">

                {messages && messages.map((msg, idx) => (
                    <div key={idx} className="message">
                        <div className="message-author">{msg.author}</div>
                        <div className="message-text">{msg.messageText}</div>
                        <div className="message-text">{msg.createTime.toString()}</div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default MessageList;