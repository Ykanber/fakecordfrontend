import api from "./axios.ts";
import type {Server} from "../types/server.ts";
import type {Channel} from "../types/common.ts";


export const ServerApi = {

    async getRegisteredServers(): Promise<Server[]> {
        const response = await api.get('/server/registeredServers');
        return response.data
    },

    async getServerChannels(serverId: number): Promise<Channel[]> {
        const response = await api.get(`/server/${serverId}/channels`);
        return response.data;
    },

    async createMessageChannel(channel: Channel): Promise<void> {
        const response = await api.post('/server/channel', channel);
        return response.data;
    }

};
