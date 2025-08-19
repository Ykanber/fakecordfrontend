import React, {useEffect, useState} from 'react'
import type {Server} from "../types/server.ts";
import {ServerApi} from "../api/server.ts";
import type {Channel} from "../types/common.ts";

interface Props {
    selectedChannel: Channel
    onSelectChannel: (channelName: Channel) => void
    selectedServer: Server
}

const ChannelSidebar: React.FC<Props> = ({selectedChannel, onSelectChannel, selectedServer}) => {


    const [channels, setChannels] = useState<Channel[]>([]);

    const fetchChannels = async () => {
        setChannels(await ServerApi.getServerChannels(1));
    }

    const addChannelButtonOnClick = () => {
        const response = ServerApi.createMessageChannel({serverId: 1, channelId: 100, channelName: "test"});
        response.then(fetchChannels);
    }

    useEffect(() => {
        fetchChannels().then(null);
    }, [selectedChannel, selectedServer]);


    return (
        <div className="channel-sidebar">
            <div className="channel-header">TEXT CHANNELS</div>
            <ul className="channel-list">
                {channels.map((channel, index) => (
                    <li
                        key={index}
                        className={`channel-item ${selectedChannel === channel ? "active" : ""}`}
                        onClick={() => {
                            onSelectChannel(channel)
                        }}
                    >
                        <span className="hash">#</span> {channel.channelName}
                    </li>
                ))}
            </ul>
            <button
                onClick={addChannelButtonOnClick}
            >
                +
            </button>
        </div>
    )
}

export default ChannelSidebar
