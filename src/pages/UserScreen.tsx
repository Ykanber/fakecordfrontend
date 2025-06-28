import ServerSidebar from "../components/ServerSidebar.tsx";
import ChannelSidebar from "../components/ChannelSidebar.tsx";
import ChatArea from "../components/ChatArea.tsx";
import {useState} from "react";

function UserScreen() {

    const [selectedChannel, setSelectedChannel] = useState('genel');

    return (
        <div className="main-panel">
            <ServerSidebar></ServerSidebar>
            <ChannelSidebar
                selectedChannel={selectedChannel}
                onSelectChannel={setSelectedChannel}
            />
            <ChatArea selectedChannel={selectedChannel}></ChatArea>
        </div>
    )
}

export default UserScreen
