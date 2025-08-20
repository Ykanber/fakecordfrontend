import ServerSidebar from "../components/ServerSidebar.tsx";
import ChannelSidebar from "../components/ChannelSidebar.tsx";
import ChatArea from "./chatArea/ChatArea.tsx";
import {useEffect, useState} from "react";
import type {Server} from "../types/server.ts";
import type {Channel} from "../types/common.ts";
import {ServerApi} from "../api/server.ts";

function UserScreen() {

    const [selectedChannel, setSelectedChannel] = useState<Channel>();
    const [selectedServer, setSelectedServer] = useState<Server>();
    const [servers, setServers] = useState<Server[]>([]);

    const fetchServers = async () => {
        try {
            const registeredServers = await ServerApi.getRegisteredServers();
            setServers(registeredServers);
        } catch (error: unknown) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchServers().then(null);
    }, []);


    const handleServerSelect = (server: Server) => {
        setSelectedServer(server);
    };

    return (
        <div className="main-panel">
            <ServerSidebar onServerSelected={handleServerSelect} servers={servers}></ServerSidebar>
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
