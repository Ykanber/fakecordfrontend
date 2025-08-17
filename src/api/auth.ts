import type {UserLoginDto, UserRegisterDto} from "../types/auth.ts";
import api from "./axios.ts";

export const registerUser = async (data: UserRegisterDto) => {
    return api.post<UserRegisterDto>('/auth/register', data);
}

export const loginUser = async (data: UserLoginDto) => {
    return api.post<UserLoginDto>('/auth/login', data);

}