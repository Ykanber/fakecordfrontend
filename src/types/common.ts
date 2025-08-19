export interface Message {
    author: string
    text: string
}

export interface Channel {
    serverId: number,
    channelId: number,
    channelName: string,
}