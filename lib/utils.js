const bcrypt = require('bcrypt')
require('dotenv').config()
const SECRET_KEY = process.env.SECRET_KEY
const jwt = require('jsonwebtoken');
// const sharp = require('sharp')
const generateToken = async(email) => {
    let token;
    const payload = {
        email:email,
        iot:new Date()
    }
    try {
        token = await jwt.sign(payload, SECRET_KEY, { expiresIn: '15m' })


    } catch (err) {
        console.error('error while creating a token', err)
        return false
    }

    return token;
}

const generatePassword = async (password) => {
    // console.log(password)
    const slatRound = 10;
    const salt = await bcrypt.genSalt(slatRound)
    const hash = await bcrypt.hash(password, salt)
    return { salt, hash };
}

const validePassword = async (password, hash, salt) => {
    // console.log(salt)
    // console.log(hash)
    const Hash = await bcrypt.hash(password, salt)

    return hash === Hash;
}

const tokenFromCookie = (req) => {
    let token = null
    // console.log('token=',req.headers.token)
    if (req.headers.token) {
        token = req.headers.token;
    }
    return token;
}
const verifyToken =async (token)=>{
    return await jwt.verify(token,SECRET_KEY)
}
 const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result.split(",")[1]);
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
    });
};

 async function compressAndEncodeImage(imagePath) {

    const imageBuffer = await sharp(imagePath).toBuffer();
    const compressedBuffer = zlib.deflateSync(imageBuffer);
    const compressedString = compressedBuffer.toString('base64');
    return compressedString;
}

 function decodeAndDecompressImage(compressedString, outputPath) {
    const compressedBuffer = Buffer.from(compressedString, 'base64');
    const decompressedBuffer = zlib.inflateSync(compressedBuffer);
    sharp(decompressedBuffer).toFile(outputPath, (err, info) => {
        if (err) {
            console.error(err);
        } else {
            console.log("Decompressed image saved at:", outputPath);
        }
    });
}





function base64ToBinary(base64String) {
    const binaryString = atob(base64String);
    const length = binaryString.length;
    const bytes = new Uint8Array(length);

    for (let i = 0; i < length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }

    return bytes;
}
module.exports = {
    compressAndEncodeImage,
    decodeAndDecompressImage,
    generatePassword,
    validePassword,
    tokenFromCookie,
    generateToken, verifyToken,
    convertFileToBase64,
    base64ToBinary
}