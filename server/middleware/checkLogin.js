import { StatusCodes } from "http-status-codes";

const checkLogin = (req, res, next) => {
    if (req.session.token)
        next();
    return;

}

export default checkLogin;