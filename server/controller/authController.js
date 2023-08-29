import { client } from "../database/connect.js"
import bcrypt from "bcrypt"
import { StatusCodes } from "http-status-codes"

const hashPassword = async (password) => {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        return hashedPassword;
    } catch (error) {
        console.error('Error hashing password:', error);
        throw error;
    }
}

const register = async (req, res, next) => {
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

export { register }