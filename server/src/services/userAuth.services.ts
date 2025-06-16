import { UserAuthMethods } from "../interface/user.interface";
import { LoginUpData, SignUpData } from "../interface/user.types";
import { IUser } from "../model/user.model";
import UserAuthRepository from "../repository/userAuth.repository";
import bcrypt from "bcrypt";

export default class UserAuthServices implements UserAuthMethods {
    private userAuthRepository: UserAuthRepository
    constructor(userAuthRepository: UserAuthRepository) {
        this.userAuthRepository = userAuthRepository
    }

    async signup(data: SignUpData): Promise<IUser | null> {
        const existUser = await this.userAuthRepository.findByEmail(data.email)
        if (existUser) {
            const error = new Error('User Already Exist')
            error.name = 'UserAlreadyExist'
            throw error
        }
        return await this.userAuthRepository.signup(data)
    }

    async login(data: LoginUpData): Promise<IUser | null> {
        const existUser = await this.userAuthRepository.login(data)
        if (!existUser) {
            const error = new Error('Invalid Credentials')
            error.name = 'InvalidCredentials'
            throw error
        }
        const isPassword = await bcrypt.compare(data.password, existUser.password)
        if (!isPassword) {
            const error = new Error('Invalid Credentials')
            error.name = 'InvalidCredentials'
            throw error
        }
        return existUser
    }
}

const userAuthRepository = new UserAuthRepository();
export const userAuthServices = new UserAuthServices(userAuthRepository);
