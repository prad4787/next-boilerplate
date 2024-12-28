import { AuthUser } from "./user";

export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    access_token: string;
    refresh_token: string;
    type: string;
    id: string;
    user: AuthUser;
}