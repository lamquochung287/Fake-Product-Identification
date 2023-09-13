import express from "express";
const route = express.Router();
import { verifyProduct } from "../controller/userController.js"

route.get("/listHistory")
route.post("/verifyProduct", verifyProduct)

export default route