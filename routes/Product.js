const express = require('express');
const router = express.Router()
// importing controllers
const multer = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'db/') // Set your destination folder 
    },
    filename: function (req, file, cb) {
        const uniqueSuffix =  Date.now()
        req.uniqueSuffix = uniqueSuffix;
        cb(null, uniqueSuffix+file.originalname)
    }
});

const upload = multer({ storage: storage });

const { productsController, singleProductController, addProductController, updateProductController, deleteProductController } = require('../controllers/Product');
const { authenticate } = require('../config/authenticationStrategy');

//////////////
router.get('/', authenticate,productsController)
    .get('/product/:productId', authenticate, singleProductController)
    // .post('/user/:userId/editPassword', editPasswordController)
    .post('/addProduct', authenticate, upload.single('image'),addProductController)
    .put('/updatetProduct/:productId', authenticate, updateProductController)
    .delete('/removeProduct/:productId', authenticate, deleteProductController)
    // .get('getTurnover',getTurnoverController)

    .all('/*', (req, res) => {
        res.status(404).json({ success: false, message: 'page not found' })

    })


module.exports = router;