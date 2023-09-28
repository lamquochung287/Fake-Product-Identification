import express from "express";
import { register, login, logout } from "../controller/authController.js";
const route = express.Router();

route.post("/login", login)
route.post("/register", register)
route.post("/logout", logout)

export default route