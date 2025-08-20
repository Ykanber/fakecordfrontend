import ServerSidebar from "./serverArea/ServerSidebar.tsx";
import ChannelSidebar from "./channelArea/ChannelSidebar.tsx";
import ChatArea from "./chatArea/ChatArea.tsx";
import {useCallback, useEffect, useState} from "react";
import type {Server} from "../types/server.ts";
import type {Channel} from "../types/common.ts";
import {ServerApi} from "../api/server.ts";

function UserScreen() {

    const [selectedChannel, setSelectedChannel] = useState<Channel>();
    const [selectedServer, setSelectedServer] = useState<Server>();
    const [servers, setServers] = useState<Server[]>([]);
    const [channels, setChannels] = useState<Channel[]>([]);

    const fetchServers = async () => {
        try {
            const registeredServers = await ServerApi.getRegisteredServers();
            setServers(registeredServers);
        } catch (error: unknown) {
            console.log(error);
        }
    }

    const fetchChannels = useCallback(async () => {
        if (selectedServer)
            setChannels(await ServerApi.getServerChannels(selectedServer.serverId));

    }, [selectedServer]);

    useEffect(() => {
        fetchServers().then(null);
        fetchChannels().then(null);
    }, [fetchChannels]);


    const handleServerSelect = (server: Server) => {
        setSelectedServer(server);
    };

    return (
        <div className="main-panel">
            <ServerSidebar onServerSelected={handleServerSelect} servers={servers}
                           selectedServer={selectedServer}></ServerSidebar>
            <ChannelSidebar
                selectedChannel={selectedChannel}
                onSelectChannel={setSelectedChannel}
                selectedServer={selectedServer}
                channels={channels}
            />
            <ChatArea selectedChannel={selectedChannel}></ChatArea>
        </div>
    )
}

export default UserScreen
