import React from "react";
import type {Channel} from "../../types/Channel.ts";
import type {Message} from "../../types/message.ts";

interface Props {
    selectedChannel?: Channel;
    messages: Message[];
}

const MessageList: React.FC<Props> = ({selectedChannel, messages}: Props) => {


    return (
        <>
            <div className="channel-header-bar">
                <span className="hash">#</span> {selectedChannel?.channelName}
            </div>

            <div className="message-list">
                {messages.map((msg, index) => (
                    <div key={index} className="message-row">
                        <div className="avatar">{msg.author[0]}</div>
                        <div className="message-content">
                            <div className="message-header">
                                <span className="author">{msg.author}</span>
                                <span className="timestamp">{new Date(msg.createTime).toLocaleString()}</span>
                            </div>
                            <div className="text">{msg.messageText}</div>
                        </div>
                    </div>

                ))}
            </div>
        </>
    );
}

export default MessageList;