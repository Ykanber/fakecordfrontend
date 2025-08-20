export type CreateServerDto = {
    logoUrl: string;
    serverName: string;
}

export type Server = {
    serverId: number,
    name: string,
    logoUrl: string
}