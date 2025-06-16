import express from 'express'
import { BACKEND_PORT, FRONTEND_PORT } from './utils/constant'
import cors from 'cors'
import { connectDB } from './config/db.config'
import { userRouter } from './routes/user.routes'
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { blogRouter } from './routes/blog.routes'


const PORT = BACKEND_PORT
connectDB()

const app = express()

const corsOptions = {
  origin: FRONTEND_PORT,
  methods: ['GET','HEAD','PUT','PATCH','POST','DELETE'],
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', userRouter)
app.use('/api/blogs', blogRouter)

app.listen(PORT, (err) => {
    if(err) {
        console.log('err: ',err)
    }
    console.log(`SERVER RUNNGIN ON http://localhost:${PORT}`)
})