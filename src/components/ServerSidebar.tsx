import '../styles/style.css'
import {useEffect, useState} from "react";
import api from "../api/axios.ts";
import PopUp from "../genericComponents/PopUp.tsx";

type Server = {
    name: string,
    logoUrl: string
}

const ServerSidebar = () => {

    const [servers, setServers] = useState<Server[]>();
    const [isServerCreationDialogOpen, setIsServerCreationDialogOpen] = useState(false);

    useEffect(() => {
        fetchServers().then(null);
    }, []);

    const fetchServers = async () => {
        try {
            const res = await api.get("/registered-servers");
            setServers(res.data);
            console.log(res.data);
        } catch (error: unknown) {
            console.log(error);
        }
    }

    const createServer = async () => {
        try {
            await api.post("/server",
                {
                    name: "test",
                    logoUrl: "test2"
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

            <PopUp visible={isServerCreationDialogOpen} onClose={
                () => setIsServerCreationDialogOpen(false)}
            >
                <div>
                    <form>
                        <label>Server Name</label>
                        <input type={"text"} placeholder={"Server Name"}/>
                    </form>
                </div>
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