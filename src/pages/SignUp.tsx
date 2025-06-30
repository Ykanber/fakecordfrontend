import axios from "axios";
import {type SubmitHandler, useForm} from "react-hook-form";
import {toast} from "sonner";
import {useNavigate} from "react-router-dom";
import api from "../api/axios.ts";

type FormValues = {
    username: string,
    password: string,
    email: string
};

const SignUp = () => {

    const {register, handleSubmit} = useForm<FormValues>();

    const navigate = useNavigate();

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        try {
            await api.post('/signup', data);
            toast.success("Sign up successfully");
            navigate("/");
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                const msg =
                    error.response?.data?.message ||
                    error.response?.data ||
                    "Kayıt sırasında bir hata oluştu.";

                toast.error(`❌ ${msg}`);
            } else {
                toast.error("❌ Beklenmeyen bir hata oluştu.");
            }
        }
    }


    return (
        <div className="login-panel-main">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="login-panel">
                    <label className={"login-header"}>FakeCord</label>
                    <input
                        minLength={3} maxLength={30} required
                        type="email" className={"login-input-field"}
                        {
                            ...register("email", {
                                required: "email is required",
                                pattern: {value: /\S+@\S+\.\S+/, message: "Invalid email address"},
                            })
                        }
                        placeholder={"Email"}
                    />

                    <input
                        minLength={3} maxLength={20}
                        {...register("username", {required: "Username is required"})}
                        type={'text'} required className={"login-input-field"} placeholder={'Username'}
                    />

                    <input
                        minLength={6} maxLength={20}
                        {...register("password", {
                            required: "Password is required",
                        })}
                        type={'password'} required className={"login-input-field"} placeholder={'Password'}/>

                    <button type={"submit"} className={"login-button"}>Sign Up</button>
                </div>
            </form>
        </div>
    );
}

export default SignUp;