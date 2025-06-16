import express from 'express'
import { userAuthController } from '../controller/userAuth.controller'

const router = express.Router()

router
.post('/signup', userAuthController.signup.bind(userAuthController))
.post('/login', userAuthController.login.bind(userAuthController))


export const userRouter = router
