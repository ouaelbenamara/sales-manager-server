const bcrypt = require('bcrypt')
require('dotenv').config()
const path = require('path')
const fs = require('fs')
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

async function cleanDb(getProducts) {
   const products = await getProducts();

    const dbImages =await fs.readdirSync('db/');
    const productImages = products.map(product => product.productPicture);

    dbImages.forEach(image => {
        if (!productImages.includes(image)) {
            const imagePath = path.join('db/', image);
            fs.unlinkSync(imagePath);
            console.log(`Deleted image: ${image}`);
        }
    });


}
module.exports = {
    generatePassword,
    validePassword,
    tokenFromCookie,
    generateToken, verifyToken,
    convertFileToBase64,
    cleanDb
}