import express from "express"
import authRoute from "./routes/authRoute.js"
import connect from "./database/connect.js"
import cookie from "cookie-session"
const app = express()


app.use(express.json());
app.use(express.urlencoded());

app.use("/auth", authRoute)

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