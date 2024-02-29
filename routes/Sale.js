const express = require('express');
const router = express.Router()


const { salesController, addSaleController, updateSaleController, deleteSaleController } = require('../controllers/Sale');
const { authenticate } = require('../config/authenticationStrategy');

//////////////
router.get('/', authenticate, salesController)
    // .get('/sale/:SaleId', singleSaleController)
    // .post('/user/:userId/editPassword', editPasswordController)
    .post('/addSale', authenticate, addSaleController)
    .put('/updatetSale/:saleId', authenticate, updateSaleController)
    .delete('/removeSale', authenticate, deleteSaleController)
    // .get('getTurnover',getTurnoverController)

    .all('/*', (req, res) => {
        res.status(404).json({ success: false, message: 'page not found' })

    })


module.exports = router;