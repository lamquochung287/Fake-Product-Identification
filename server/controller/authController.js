import { client } from "../database/connect.js"
import bcrypt from "bcrypt"
import { StatusCodes } from "http-status-codes"
import jwt from "jsonwebtoken"
const hashPassword = async (password) => {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        return hashedPassword;
    } catch (error) {
        console.error('Error hashing password:', error);
        throw error;
    }
}

const comparePassword = async (passwordInput, password) => {
    try {
        const resultCompare = await bcrypt.compare(passwordInput, password.trim())
        return resultCompare;
    } catch (error) {
        throw error;
    }
}

const register = async (req, res) => {
    const { username, password, email, role } = req.body
    const hashedPassword = await hashPassword(password)
    const addUsersQuery = `insert into users (username,password,email,role) values ($1,$2,$3,$4);`
    const values = [username, hashedPassword, email, role]
    try {
        await client.query(addUsersQuery, values);
        return res.status(StatusCodes.CREATED).json({ msg: "Create new account success" });
    } catch (error) {
        if (error.code === "23505")
            return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Username is exists, Please enter another username" });
        return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Created new account not successful" });
    }

}

const signToken = (userId, username, email, role) => {
    const user = { userId: userId, username: username, email: email, role: role }
    const token = jwt.sign({ user: user }, "privatekey", { expiresIn: 60 * 60 })
    return token
}

const login = async (req, res) => {
    const { username, password } = req.body
    try {
        const selectUsers = await client.query(`SELECT * from users where username = '${username}'`)
        if (selectUsers.rowCount === 0)
            return res.status(StatusCodes.BAD_REQUEST).json({ msg: "username not exists" })
        const user = selectUsers.rows
        const matchPassword = await comparePassword(password, user[0].password)
        if (!matchPassword)
            return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Password not correct" })
        const token = signToken(user[0].user_id, user[0].username, user[0].email, user[0].role)
        req.session.token = token
        return res.status(StatusCodes.OK).json({ msg: "Login success", token: req.session.token })
    } catch (error) {
        console.log(error)
        return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Error login" })
    }

}

export { register, login }