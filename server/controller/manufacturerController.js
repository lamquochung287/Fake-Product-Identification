import { StatusCodes } from "http-status-codes"
import jwt from "jsonwebtoken"
import { client } from "../database/connect.js"

const addProduct = async (req, res) => {
    const { productName, price, productPIN, productImage } = req.body
    const token = req.session.token
    const tokenDecode = jwt.verify(token, process.env.privateKey)
    const user = tokenDecode.user
    const values = [productName, price, productPIN, productImage, user.userId]
    const addProductQuery = `insert into product (productname, price, productpin, productimage, manufacturer_id) values($1,$2,$3,$4,$5)`
    try {
        await client.query(addProductQuery, values)
        return res.status(StatusCodes.CREATED).json({ msg: "created new product successfully" })
    } catch (error) {
        if (error.code === "23505")
            return res.status(StatusCodes.BAD_REQUEST).json({ msg: "PIN product is exists, Please enter another PIN product" });
        return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Created new product not successful " })
    }
}

const getProductDetails = async (req, res) => {
    const token = req.session.token
    const tokenDecode = jwt.verify(token, process.env.privateKey)
    const productId = req.params.productId
    const getProductByIDQuery = `select * from product where product_id = $1 LIMIT 1`
    const values = [productId]
    try {
        const productInfo = await client.query(getProductByIDQuery, values)
        if (productInfo.rowCount === 0)
            return res.status(StatusCodes.BAD_REQUEST).json({ msg: `get product by id ${productId} not exist` })
        return res.status(StatusCodes.OK).json({ msg: `get product by id ${productId} success`, product: productInfo.rows })
    } catch (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Get product not successful " })
    }
}


const getProductByUser = async (req, res) => {
    const token = req.session.token
    const tokenDecode = jwt.verify(token, process.env.privateKey)
    const user = tokenDecode.user
    const getProductByManufacturerIDQuery = `select * from product where manufacturer_id = $1`
    const values = [user.userId]
    try {
        const productInfo = await client.query(getProductByManufacturerIDQuery, values)
        if (productInfo.rowCount === 0)
            return res.status(StatusCodes.BAD_REQUEST).json({ msg: `get product by manufacturer id ${user.userId} not exist` })
        return res.status(StatusCodes.OK).json({ msg: `get product by manufacturer id ${user.userId} success`, product: productInfo.rows })
    } catch (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Get product not successful " })
    }
}
const editProduct = (req, res) => {
    return res.json({ msg: "edit product" })
}
const deleteProduct = (req, res) => {
    return res.json({ msg: "delete product" })
}


export { addProduct, getProductDetails, editProduct, deleteProduct, getProductByUser }