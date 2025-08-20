import React from "react";
import type {Channel} from "../../types/common.ts";
import MessageInput from "./MessageInput.tsx";
import MessageList from "./MessageList.tsx";

interface Props {
    selectedChannel?: Channel;
}

const ChatArea: React.FC<Props> = ({selectedChannel}) => {


    return (
        <main className="chat-window">
            <MessageList selectedChannel={selectedChannel}/>
            <MessageInput selectedChannel={selectedChannel}/>
        </main>
    );
}

export default ChatArea;