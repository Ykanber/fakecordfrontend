import React from 'react'

const channels = ['genel', 'sohbet', 'oyun', 'duyurular']

interface Props {
    selectedChannel: string
    onSelectChannel: (channelName: string) => void
}

const ChannelSidebar: React.FC<Props> = ({selectedChannel, onSelectChannel}) => {
    return (
        <div className="channel-sidebar">
            <div className="channel-header">TEXT CHANNELS</div>
            <ul className="channel-list">
                {channels.map((name, index) => (
                    <li
                        key={index}
                        className={`channel-item ${selectedChannel === name ? "active" : ""}`}
                        onClick={() => {
                            onSelectChannel(name)
                        }}
                    >
                        <span className="hash">#</span> {name}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ChannelSidebar
