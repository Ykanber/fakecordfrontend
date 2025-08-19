import api from "./axios.ts";
import type {Message, MessageCreationDto} from "../types/message.ts";

export const MessageApi = {

    async getChannelMessages(serverId: number, channelId: number): Promise<Message[]> {
        const response = await api.get(`/server/${serverId}/${channelId}`);
        return response.data
    },

    async sendMessage(message: MessageCreationDto): Promise<MessageCreationDto> {
        const response = await api.post(`/server/channel/message`, message);
        return response.data;
    }

};
