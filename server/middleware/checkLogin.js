import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken"


const checkLogin = (req, res, next) => {
    const token = req.headers.authorization || req.session.token
    if (!token)
        return res.json({ msg: "Please login first" });
    if (token) {
        jwt.verify(token.replace('Bearer ', ''), process.env.privateKey, (err, decoded) => {
            if (err) {
                return res.status(403).json({ msg: 'Invalid token' });
            } else {
                req.session.token = token.replace('Bearer ', '');
                return next();
            }
        })
    }

}

export default checkLogin;