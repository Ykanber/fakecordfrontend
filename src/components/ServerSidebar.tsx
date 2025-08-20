import '../styles/style.css'
import {useEffect, useState} from "react";
import api from "../api/axios.ts";
import PopUp from "../genericComponents/PopUp.tsx";
import {useForm} from "react-hook-form";
import type {CreateServerDto, Server} from "../types/server.ts";
import {toast} from "sonner";

interface ServerSidebarProps {
    onServerSelected: (server: Server) => void;
    servers: Server[];
    selectedServer: Server | undefined;
}

const ServerSidebar = ({onServerSelected, servers, selectedServer}: ServerSidebarProps) => {

    const [isServerCreationDialogOpen, setIsServerCreationDialogOpen] = useState(false);
    const {register, handleSubmit, formState: {errors}, reset} = useForm<CreateServerDto>();


    const createServer = async (data: CreateServerDto) => {
        try {
            await api.post('/server',
                {
                    name: data.serverName,
                    logoUrl: data.logoUrl
                })
                .then(() => {
                        setIsServerCreationDialogOpen(false);
                        toast.success("Server successfully created");
                    }
                )
                .catch(() => {
                    toast.error("Server cannot be created");
                });
        } catch (error: unknown) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (!isServerCreationDialogOpen)
            reset();
    }, [isServerCreationDialogOpen, reset]);

    return (
        <aside className={"sidebar"}>

            <button onClick={() => setIsServerCreationDialogOpen(true)}>
            </button>

            <PopUp visible={isServerCreationDialogOpen}
                   onClose={
                       () => setIsServerCreationDialogOpen(false)}
                   contentClassName="create-server-panel"

            >
                <form onSubmit={handleSubmit(createServer)}>
                    <div className="create-server-panel">
                        <label>Server Name</label>
                        <input
                            {...register("serverName", {required: true})
                            }
                        />
                        {errors.serverName && (
                            <p className="text-red-500 text-sm">Name is required</p>
                        )}
                        <label className="block text-sm">Logo URL</label>
                        <input
                            {...register("logoUrl", {required: true})}
                            className="border p-2 w-full"
                        />
                        {errors.logoUrl && (
                            <p className="text-red-500 text-sm">Logo URL is required</p>
                        )}
                    </div>
                    <button type="submit">
                        Create Server
                    </button>
                </form>
            </PopUp>

            {
                servers &&
                servers.map((server, index) => (
                    <div
                        key={index}
                        title={`Server ${index + 1}`}
                        onClick={() => {
                            onServerSelected(server);
                        }}
                        className={`server-icon ${selectedServer?.name === server.name ? "active" : ""}`}>
                        <img
                            src={server.logoUrl}
                            alt={server.name}
                            className={"server-icon img"}
                        />
                    </div>
                ))

            }
        </aside>
    )
}

export default ServerSidebar;