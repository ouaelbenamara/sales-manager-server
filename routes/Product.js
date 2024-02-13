const express = require('express');
const router = express.Router()
// importing controllers

const { productsController, singleProductController, addProductController, updateProductController, deleteProductController } = require('../controllers/Product')

//////////////
router.get('/' ,productsController)
    .get('/product/:productId',singleProductController)
    // .post('/user/:userId/editPassword', editPasswordController)
    .post('/addProduct',addProductController)
    .put('/updatetProduct/:productId', updateProductController)
    .delete('/removeProduct/:productId', deleteProductController)
    // .get('getTurnover',getTurnoverController)

    .all('/*', (req, res) => {
        res.status(404).json({ success: false, message: 'page not found' })

    })


module.exports = router;