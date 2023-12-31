import express from "express"
import authRoute from "./routes/authRoute.js"
import manufacturerRoute from "./routes/manufacturerRoute.js"
import connect from "./database/connect.js"
import session from "express-session"
import cors from "cors"
import { rateLimit } from "express-rate-limit"
import dotenv from "dotenv"
import checkRoleUser from "./middleware/checkRoleUser.js"
import checkLogin from "./middleware/checkLogin.js"
import cookieParser from "cookie-parser"
import fileUpload from "express-fileupload"
import userRoute from "./routes/userRoute.js"
dotenv.config()


const app = express()
app.use(express.json());
app.use(express.urlencoded());
app.use(cors({
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE"
}))

app.use(cookieParser());
app.use(rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 100,
}))
app.use(fileUpload())
app.use(session({
    secret: 'secretKey',
    saveUninitialized: true,
    cookie: { secure: false },
}))

app.use("/auth", authRoute)
app.use("/manufacturer", checkLogin, checkRoleUser, manufacturerRoute)
app.use("/user", checkLogin, userRoute)

const startServer = app.listen(5000, () => {
    console.log("Sever run port 5000")
})

const start = async () => {
    try {
        startServer;
        await connect;
    }
    catch (error) {
        console.log(error)
    }
}

start()