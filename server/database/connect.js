import pkg from "pg";
import dotenv from "dotenv";
dotenv.config()

const { Client } = pkg

export const client = new Client({
    host: process.env.hostDB,
    user: process.env.userDB,
    port: process.env.portDB,
    password: process.env.passwordDB,
    database: process.env.databaseName,
})


const connect = client.connect().then(() => { console.log("connect to database success") })
    .catch(err => { console.log("connect to database error ", err) })

export default connect;