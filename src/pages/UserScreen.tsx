import ServerSidebar from "../components/ServerSidebar.tsx";
import ChannelSidebar from "../components/ChannelSidebar.tsx";
import ChatArea from "../components/ChatArea.tsx";
import {useEffect, useState} from "react";
import type {Server} from "../types/server.ts";
import type {Channel} from "../types/common.ts";

function UserScreen() {

    const [selectedChannel, setSelectedChannel] = useState<Channel>();
    const [selectedServer, setSelectedServer] = useState<Server>();

    const handleServerSelect = (server: Server) => {
        setSelectedServer(server);
    };

    useEffect(() => {
        console.log("ServerDeğişti")
    }, [selectedServer]);

    return (
        <div className="main-panel">
            <ServerSidebar onServerSelected={handleServerSelect}></ServerSidebar>
            <ChannelSidebar
                selectedChannel={selectedChannel}
                onSelectChannel={setSelectedChannel}
                selectedServer={selectedServer}
            />
            <ChatArea selectedChannel={selectedChannel}></ChatArea>
        </div>
    )
}

export default UserScreen
