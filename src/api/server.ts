import api from "./axios.ts";

export const getRegisteredServers = async () => {
    return await api.get('/server/registeredServers');
}