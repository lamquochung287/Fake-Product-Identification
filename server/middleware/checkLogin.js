import { StatusCodes } from "http-status-codes";

const checkLogin = (req, res, next) => {
    if (req.session.token)
        return next();
    return res.json({ msg: "Please login first" });

}

export default checkLogin;