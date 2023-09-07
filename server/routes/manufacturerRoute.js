import express from "express";
import { addProduct, getProductDetails, editProduct, deleteProduct, getProductByUser } from "../controller/manufacturerController.js"
const router = express.Router();

router.get("/productDetails/:productId", getProductDetails)
router.get("/getAllProduct", getProductByUser)
router.post("/addProduct", addProduct)
router.put("/editProduct/:productId", editProduct)
router.delete("/deleteProduct/:productId", deleteProduct)


export default router;