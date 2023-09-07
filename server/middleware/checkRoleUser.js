import jwt from "jsonwebtoken"
import { StatusCodes } from "http-status-codes";
import dotenv from "dotenv"
dotenv.config()

// check role user from token save in session
// get token save in req.session then decode token and check role
const checkRoleUser = (req, res, next) => {
    const token = req.session.token
    const tokenDecode = jwt.verify(token, process.env.privateKey)
    const user = tokenDecode.user
    if (user.role.trim() === 'manufacturer')
        next()
    return;

}

export default checkRoleUser;