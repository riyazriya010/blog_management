import { IUser } from "../model/user.model";
import { LoginUpData, SignUpData } from "./user.types";

export interface UserAuthMethods {
    signup(data: SignUpData): Promise<IUser | null>
    login(data: LoginUpData): Promise<IUser | null>
}