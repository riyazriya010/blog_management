import dotenv from 'dotenv'
dotenv.config()

export const BACKEND_PORT = process.env.BACKEND_PORT
export const FRONTEND_PORT = process.env.FRONTEND_PORT
export const MONGODB_URI = process.env.MONGODB_URI
export const JWT_SECRET = process.env.JWT_SECRET