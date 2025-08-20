export interface Channel {
    serverId: number,
    channelId: number,
    channelName: string,
}

export interface CreateChannelDto {
    serverId: number,
    channelName: string,
}