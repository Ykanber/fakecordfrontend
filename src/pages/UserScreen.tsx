import ServerSidebar from "./serverArea/ServerSidebar.tsx";
import ChannelSidebar from "./channelArea/ChannelSidebar.tsx";
import ChatArea from "./chatArea/ChatArea.tsx";
import {useCallback, useEffect, useState} from "react";
import type {Server} from "../types/server.ts";
import {ServerApi} from "../api/server.ts";
import {MessageApi} from "../api/message.ts";
import type {Message} from "../types/message.ts";
import type {Channel} from "../types/Channel.ts";

function UserScreen() {

    const [selectedChannel, setSelectedChannel] = useState<Channel>();
    const [selectedServer, setSelectedServer] = useState<Server>();
    const [servers, setServers] = useState<Server[]>([]);
    const [channels, setChannels] = useState<Channel[]>([]);
    const [messages, setMessages] = useState<Message[]>([]);

    const fetchServers = useCallback(async () => {
        try {
            const registeredServers = await ServerApi.getRegisteredServers();
            setServers(registeredServers);
            if (!selectedServer)
                setSelectedServer(registeredServers[0]);
        } catch (error: unknown) {
            console.log(error);
        }
    }, []);

    const fetchChannels = useCallback(async () => {
        if (selectedServer) {
            const channels = await ServerApi.getServerChannels(selectedServer.serverId);
            setChannels(channels);
            if (!selectedChannel) {
                setSelectedChannel(channels[0]);
            }
        }
    }, [selectedServer]);


    const getChannelMessages = useCallback(async () => {
        if (selectedChannel) {
            const messages = await MessageApi.getChannelMessages(1, selectedChannel?.channelId);
            setMessages(messages);
        }
    }, [selectedChannel]);

    useEffect(() => {
        fetchServers().then(null);
    }, [fetchServers]);

    useEffect(() => {
        fetchChannels().then(null);
    }, [fetchChannels]);


    useEffect(() => {
        getChannelMessages().then(null);
    }, [getChannelMessages]);


    const handleServerSelect = (server: Server) => {
        setSelectedServer(server);
    };

    const handleChannelSelect = useCallback((channel: Channel) => {
        setSelectedChannel(channel);
    }, [selectedChannel]);

    return (
        <div className="main-panel">
            <ServerSidebar onServerSelected={handleServerSelect} servers={servers}
                           selectedServer={selectedServer}></ServerSidebar>
            <ChannelSidebar
                selectedChannel={selectedChannel}
                onSelectChannel={handleChannelSelect}
                selectedServer={selectedServer!}
                channels={channels}
                onAddChannel={fetchChannels}
            />
            <ChatArea selectedChannel={selectedChannel} messages={messages}></ChatArea>
        </div>
    )
}

export default UserScreen
