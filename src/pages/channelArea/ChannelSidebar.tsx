import React from 'react'
import type {Server} from "../../types/server.ts";
import {ServerApi} from "../../api/server.ts";
import type {Channel} from "../../types/common.ts";

interface Props {
    selectedChannel: Channel | undefined
    onSelectChannel: (channelName: Channel) => void
    selectedServer: Server | undefined
    channels: Channel[]
}

const ChannelSidebar: React.FC<Props> = ({selectedChannel, onSelectChannel, selectedServer, channels}) => {


    const addChannelButtonOnClick = () => {
        const res = ServerApi.createMessageChannel({serverId: 1, channelId: 5, channelName: "test"});
        res.then(() => onSelectChannel({serverId: 1, channelId: 5, channelName: "test"}));
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
                </>
            }
        </div>
    )
}

export default ChannelSidebar
