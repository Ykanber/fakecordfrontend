export interface MessageCreationDto {
    channelId: number;
    messageText: string;
}

export interface Message {
    messageText: string;
    author: string;
    createTime: Date;
}