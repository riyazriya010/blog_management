import { Request, Response } from "express";
import UserAuthServices, { userAuthServices } from "../services/userAuth.services";
import { sendAuthResponse, sendErrorResponse } from "../utils/responseHelper";
import { JwtService } from "../integration/jwt";
import { HttptatusCode } from "../utils/httpStatusCodes";

class UserAuthController {
    private userAuthServices: UserAuthServices
    private jwtService: JwtService
    constructor(userAuthServices: UserAuthServices) {
        this.userAuthServices = userAuthServices
        this.jwtService = new JwtService()
    }

    async signup(req: Request, res: Response): Promise<void> {
        try {
            console.log('reqqq ', req.body)
            const { username, email, password } = req.body
            const savedUser = await this.userAuthServices.signup({ username, email, password })

            const accessToken = await this.jwtService.createAccessToken(savedUser?._id, String(savedUser?.email))
            const refreshToken = await this.jwtService.createRefreshToken(savedUser?._id, String(savedUser?.email))

            sendAuthResponse(
                res,
                String(accessToken),
                String(refreshToken),
                "User Saved To DB",
                HttptatusCode.OK,
                savedUser
            )
            return;
        } catch (error: unknown) {
            if (error instanceof Error) {
                if (error.name === 'UserAlreadyExist') {
                    sendErrorResponse(res, HttptatusCode.CONFLICT, "User Already Exist")
                    return;
                }
            }
            sendErrorResponse(res, HttptatusCode.INTERNAL_SERVER_ERROR, "Internal Server Error")
            return;
        }

    }

    async login(req: Request, res: Response): Promise<void> {
        try {
            const data = req.body
            const loginUser = await this.userAuthServices.login(data)

            //create Jwt Token
            const accessToken = await this.jwtService.createAccessToken(loginUser?._id, String(loginUser?.email))
            const refreshToken = await this.jwtService.createRefreshToken(loginUser?._id, String(loginUser?.email))

            sendAuthResponse(
                res,
                String(accessToken),
                String(refreshToken),
                "User Logged",
                HttptatusCode.OK,
                loginUser
            )
            return;
        } catch (error: unknown) {
            if (error instanceof Error) {
                if (error.name === 'InvalidCredentials') {
                    sendErrorResponse(res, HttptatusCode.UNAUTHORIZED, "Invalid Credentials")
                    return;
                }
            }
            sendErrorResponse(res, HttptatusCode.INTERNAL_SERVER_ERROR, "Internal Server Error")
            return;
        }
    }
}

export const userAuthController = new UserAuthController(userAuthServices)

