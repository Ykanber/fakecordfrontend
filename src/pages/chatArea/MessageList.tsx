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