import React from 'react'
import type {Server} from "../../types/server.ts";
import {ServerApi} from "../../api/server.ts";
import type {Channel} from "../../types/Channel.ts";

interface Props {
    selectedChannel: Channel | undefined
    onSelectChannel: (channelName: Channel) => void
    onAddChannel: () => void
    selectedServer: Server
    channels: Channel[]
}

const ChannelSidebar: React.FC<Props> = ({
                                             selectedChannel,
                                             onSelectChannel,
                                             onAddChannel,
                                             selectedServer,
                                             channels
                                         }) => {


    const addChannelButtonOnClick = () => {
        const res = ServerApi.createMessageChannel({
            serverId: selectedServer.serverId,
            channelName: "test"
        });
        res.then(() => onAddChannel());
    }

    return (
        <div className="channel-sidebar">
            <div className="channel-header">TEXT CHANNELS</div>
            {selectedServer &&
                <>
                    <ul className="channel-list">
                        {channels.map((channel, index) => (
                            <li
                                key={index}
                                className={`channel-item ${selectedChannel?.channelId === channel.channelId ? "active" : ""}`}
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
                </>
            }
        </div>
    )
}

export default ChannelSidebar
