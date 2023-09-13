import Qrcode from 'qrcode-reader';
import Jimp from 'jimp';
import { StatusCodes } from "http-status-codes"
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
            console.log('QR Code Value:', decodeQR.result);
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

const verifyProduct = async (req, res) => {
    const imageUpload = req.files.file.data
    const qrDecoded = await readDecodeQR(imageUpload)
    if (qrDecoded === null)
        return res.status(StatusCodes.BAD_REQUEST).json({ msg: "QR code could be decoded please try again" })
    const querySelectProductPIN = `Select * from product where productpin = $1`
    const values = [qrDecoded.toString().trim()]
    try {
        const resultVerify = await client.query(querySelectProductPIN, values)
        if (resultVerify.rowCount === 0) {
            return res.status(StatusCodes.OK).json({ msg: `Verify product success`, product: false })
        }
        return res.status(StatusCodes.OK).json({ msg: `Verify product success`, product: true })

    } catch (error) {
        console.log(error)
        return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Verify product not successful " })
    }

}

export { readDecodeQR, verifyProduct };


