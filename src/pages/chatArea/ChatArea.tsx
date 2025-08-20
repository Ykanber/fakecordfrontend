import React from "react";
import type {Channel} from "../../types/Channel.ts";
import MessageInput from "./MessageInput.tsx";
import MessageList from "./MessageList.tsx";
import type {Message} from "../../types/message.ts";

interface Props {
    selectedChannel?: Channel;
    messages: Message[];
}

const ChatArea: React.FC<Props> = ({selectedChannel, messages}) => {

    return (
        <main className="chat-window">
            <MessageList selectedChannel={selectedChannel} messages={messages}/>
            <MessageInput selectedChannel={selectedChannel}/>
        </main>
    );
}

export default ChatArea;