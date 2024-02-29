
const { addNewSale, deleteSale, updateSale, getSales, deleteSales, } = require('../models/Sale');
require('dotenv').config();

const salesController = async (req, res) => {
    let respons = await getSales();


   
    if (!respons) {
        return res.status(500).json({success:false,message:'error while retrieving sales from the database'})
    }

    return res.status(200).json(respons);
}


// const singleSaleController = async (req, res) => {
//     const saleId = req.params.saleId
//     if (!saleId) {
//         return res.status(501).json({ success: false, message: 'saleId is required' })
//     }

//     const respons = await getsale(saleId)
//     const sale = {
//         _id: respons._id,
//         saleName: respons.saleName,
//         salePicture: `${PICTURE_URI + respons.salePicture}`,
//         price: respons.price,
//         count: respons.count
//     }
//     res.status(200).json(sale)
// }


const deleteSaleController = async (req, res) => {
    const {saleIds} = req.body
    
    if (!saleIds || saleIds?.length ===0) {
        return res.status(500).json({success:false,message:"saleIds to delete are required"})
    }
    const respons = await deleteSales({ salesToDelete: saleIds });
    if (!respons) {
        return res.status(501).json({ success: false, message: "error while deleting sale" })
    }

    res.status(200).json({ message: 'sale deleted seccussfuly' })
}

const updateSaleController = async (req, res) => {
    let respons
    const saleId = req.params.saleId;
    const { saleName, price, count, buyPrice } = req.body;
    if (!saleId) {
        return res.status(500).send("saleId to update is required")
    }

    respons = await updateSale({ saleName, saleId, price, count, buyPrice });

    if (!respons) {
        return res.status(500).json({ success: false, message: "error while updating sale" })
    }
    res.status(200).json(respons._doc)
}

const addSaleController = async (req, res) => {


console.log(req.body)
    const { saleName, price, count, buyPrice ,createdAt} = req.body;
    // console.log('here', saleName, price, count, buyPrice)
    // Check if any of the required fields is undefined
    if (saleName === 'undefined' || price === 'undefined' || count === 'undefined' || buyPrice === 'undefined'||
        saleName === null || price === null || count === null || buyPrice===null
    ) {
        

        return res.status(501).json({ success: false, message: 'All fields are required' });
    }
console.log('created at,',createdAt)
    const respons = await addNewSale({ saleName, price, count,buyPrice,createdAt });

    if (!respons) {
        return res.status(502).json({ success: false, message: 'Error while adding new sale' });
    }

    res.status(200).json(respons._doc );
};



module.exports = {
    salesController,
    // singleSaleController,
    updateSaleController,
    deleteSaleController,
    addSaleController
};