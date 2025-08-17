import '../styles/style.css'
import {useEffect, useState} from "react";
import api from "../api/axios.ts";
import PopUp from "../genericComponents/PopUp.tsx";
import {getRegisteredServers} from "../api/server.ts";
import {useForm} from "react-hook-form";
import type {CreateServerDto} from "../types/server.ts";

type Server = {
    name: string,
    logoUrl: string
}

const ServerSidebar = () => {

    const [servers, setServers] = useState<Server[]>();
    const [isServerCreationDialogOpen, setIsServerCreationDialogOpen] = useState(false);

    const {register, handleSubmit, formState: {errors}} = useForm<CreateServerDto>();


    useEffect(() => {
        fetchServers().then(null);
    }, []);

    const fetchServers = async () => {
        try {
            const res = await getRegisteredServers();
            setServers(res.data);
            console.log(res.data);
        } catch (error: unknown) {
            console.log(error);
        }
    }

    const createServer = async (data: CreateServerDto) => {
        try {
            await api.post('/server',
                {
                    name: data.serverName,
                    logoUrl: data.logoUrl
                });
            await fetchServers();
        } catch (error: unknown) {
            console.log(error);
        }
    }

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
                    <div key={index}
                         title={`Server ${index + 1}`}>
                        <label>
                            {server.name}
                        </label>
                    </div>
                ))
            }
        </aside>
    )
}

export default ServerSidebar;