import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./Login.tsx";
import UserScreen from "./UserScreen.tsx";
import SignUp from "./SignUp.tsx";
import {Toaster} from "sonner";

const MainPanel = () => {

    return (
        <BrowserRouter basename={"/fakecordfrontend"}>
            <Toaster position={"top-right"} richColors/>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/signup" element={<SignUp/>}/>
                <Route path="/profile" element={<UserScreen/>}/>
            </Routes>
        </BrowserRouter>
    );

}
export default MainPanel;