import { UserAuthMethods } from "../interface/user.interface";
import { LoginUpData, SignUpData } from "../interface/user.types";
import { IUser, UserModel } from "../model/user.model";
import CommonBaseRepository from "./base/base.repository";

export default class UserAuthRepository extends CommonBaseRepository<{
    User: IUser
}> implements UserAuthMethods {
    constructor(){
        super({
            User: UserModel
        })
    }

    async signup(data: SignUpData): Promise<IUser | null> {
        return this.createData('User',data)
    }

    async login(data: LoginUpData): Promise<IUser | null> {
        return this.findOne('User',{email: data.email})
    }

    async findByEmail(email: string): Promise<IUser | null> {
        return this.findOne('User',{email})
    }
}

