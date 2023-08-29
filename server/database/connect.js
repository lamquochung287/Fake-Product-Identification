import pkg from "pg";

const { Client } = pkg

export const client = new Client({
    host: 'localhost',
    user: 'postgres',
    port: 5432,
    password: '123456',
    database: 'fakeproductdb',
})

const connect = client.connect().then(() => { console.log("connect to database success") })
    .catch(err => { console.log("connect to database error ", err) })

export default connect;