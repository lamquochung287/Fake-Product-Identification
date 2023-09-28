import express from "express";
const route = express.Router();
import { verifyProduct, getAllHistoryByUserId, detailHistory } from "../controller/userController.js"

route.get("/listHistory")
route.post("/verifyProduct", verifyProduct)
route.post("/getAllHistory", getAllHistoryByUserId)
route.get("/detailHistory/:historyId", detailHistory)



export default route