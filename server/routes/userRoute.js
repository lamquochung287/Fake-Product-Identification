import express from "express";
const route = express.Router();
import { verifyProduct, getAllHistoryByUserId, detailHistory } from "../controller/userController.js"

route.post("/verifyProduct", verifyProduct)
route.get("/getAllHistory", getAllHistoryByUserId)
route.get("/detailHistory/:historyId", detailHistory)



export default route