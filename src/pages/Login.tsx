import {useNavigate} from "react-router-dom";
import {type SubmitHandler, useForm} from "react-hook-form";
import axios from "axios";
import {toast} from "sonner";
import type {UserLoginDto, UserRegisterDto} from "../types/auth.ts";
import {loginUser} from "../api/auth.ts";

const Login = () => {

    const navigate = useNavigate();

    const {register, handleSubmit} = useForm<UserRegisterDto>();

    const navigateToSignUp = () => {
        navigate("/signup");
    }

    const navigateToUserScreen = () => {
        navigate("/profile");
    }

    const onSignIn: SubmitHandler<UserLoginDto> = async (data: UserLoginDto) => {

        try {
            await loginUser(data);
            toast.success("Logged in");
            navigateToUserScreen();
        } catch (error: unknown) {
            if (axios.isAxiosError(error) && error.response?.status === 401) {
                toast.error("❌ Kullanıcı adı veya şifre hatalı");
            } else {
                toast.error("❌ Giriş sırasında bir hata oluştu");
            }
        }
    }

    return (
        <div className="login-panel-main">
            <form onSubmit={handleSubmit(onSignIn)}>
                <div className="login-panel">
                    <label className={"login-header"}>FakeCord</label>
                    <input
                        {
                            ...register("username", {required: "Username is required"})
                        }
                        type={'text'} className={"login-input-field"} placeholder={'Username'}
                        maxLength={20} minLength={3} required
                    />
                    <input
                        {
                            ...register("password", {required: "Password is required"})
                        }
                        type={'password'} className={"login-input-field"} placeholder={'Password'}
                        minLength={6} maxLength={20} required
                    />
                    <button className={"login-button"} type={"submit"}>Login</button>
                    <button onClick={navigateToSignUp} className={"signup-button"}>Sign Up</button>
                </div>
            </form>

        </div>
    );
}

export default Login;