import Qrcode from 'qrcode-reader';
import Jimp from 'jimp';
import { StatusCodes } from "http-status-codes"
import jwt from "jsonwebtoken"
import { client } from "../database/connect.js"

const readDecodeQR = async (file) => {
    try {
        // Read the image using Jimp
        const imageUpload = await Jimp.read(file);

        // Create a QR code reader instance
        const qr = new Qrcode();
        const decodeQR = await new Promise((resolve, reject) => {
            qr.callback = (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            };
            qr.decode(imageUpload.bitmap);
        });

        if (decodeQR && decodeQR.result) {
            // console.log('QR Code Value:', decodeQR.result);
            const result = decodeQR.result
            return result.toString();
        } else {
            console.error('QR Code could not be decoded.');
            return null
        }
    } catch (error) {
        console.error(error);
        return null
    }
};

const saveHistory = async (productPIN, user, resultVerify) => {
    const querySaveHistory = `Insert into historyVerify (productPIN, user_id, result_verify) values($1,$2,$3)`
    const values = [productPIN, user.userId, resultVerify]
    try {
        await client.query(querySaveHistory, values)
        console.log("save history successfully")
    } catch (error) {
        console.log(error)
    }
}

const getAllHistoryByUserId = async (req, res) => {
    const token = req.session.token
    const tokenDecode = jwt.verify(token, process.env.privateKey)
    const user = tokenDecode.user
    const querySelectHistory = `Select * from historyVerify where user_id = ${user.userId}`
    try {
        const result = await client.query(querySelectHistory)
        return res.status(StatusCodes.OK).json({ msg: "Get history success", histories: result.rows })
    } catch (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({ msg: error })
    }
}

const detailHistory = async (req, res) => {
    const historyId = req.params.historyId
    const querySelectHistory = `Select * from historyVerify where history_id = ${historyId}`
    try {
        const result = await client.query(querySelectHistory)
        if (result.rowCount === 0)
            return res.status(StatusCodes.BAD_REQUEST).json({ msg: "This history not exists" })
        return res.status(StatusCodes.OK).json({ msg: "Get history success", histories: result.rows })
    } catch (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({ msg: error })
    }
}

const verifyProduct = async (req, res) => {
    const imageUpload = req.files.file.data
    const qrDecoded = await readDecodeQR(imageUpload)
    if (qrDecoded === null)
        return res.status(StatusCodes.BAD_REQUEST).json({ msg: "QR code could be decoded please try again" })
    const querySelectProductPIN = `Select * from product where productpin = $1`
    const values = [qrDecoded.toString().trim()]
    const token = req.session.token
    const tokenDecode = jwt.verify(token, process.env.privateKey)
    const user = tokenDecode.user
    try {
        const resultVerify = await client.query(querySelectProductPIN, values)
        let resultVerifyProduct = false
        if (resultVerify.rowCount === 0) {
            saveHistory(qrDecoded.toString().trim(), user, resultVerifyProduct)
            return res.status(StatusCodes.OK).json({ msg: `Verify product success`, resultVerifyProduct: resultVerifyProduct })
        }
        resultVerifyProduct = true
        saveHistory(qrDecoded.toString().trim(), user, resultVerifyProduct)
        return res.status(StatusCodes.OK).json({ msg: `Verify product success`, resultVerifyProduct: resultVerifyProduct })

    } catch (error) {
        console.log(error)
        return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Verify product not successful " })
    }

}

export { readDecodeQR, verifyProduct, getAllHistoryByUserId, detailHistory };


