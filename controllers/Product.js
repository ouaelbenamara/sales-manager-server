
const { addNewProduct, deleteProduct, updateProduct, getProducts, getProduct,  } = require('../models/Product');
require('dotenv').config();
const PICTURE_URI = process.env.PICTURE_URI;
const productsController = async (req, res) => {
    let respons = await getProducts();


    respons = respons?.map(product => ({
        _id: product._id,
        productName: product.productName,
        productPicture: `${PICTURE_URI+product.productPicture}`, // Construct the URL to the image
        price:product.price,
        count:product.count
    }))
    if (!respons) {
        return res.status(500).send('<h1>error while retrieving products</h1>')
    }
    
    return res.status(200).json(respons);
}


const singleProductController = async (req, res) => {
    const productId = req.params.productId
    if(!productId){
        return res.status(501).json({success:false,message:'productId is required'})
    }

    const respons = await getProduct(productId)
    const product = {
        _id: respons._id,
        productName: respons.productName,
        productPicture: `${PICTURE_URI + respons.productPicture}`,
        price: respons.price,
        count: respons.count
    }
    res.status(200).json(product)
}


const deleteProductController = async (req, res) => {
    const productId = req.params.productId;
    if (!productId) {
        return res.status(500).send("productId to delete is required")
    }
    const respons = await deleteProduct({ productIdToDelete: productId });
    if (!respons) {
        return res.status(500).send("error while deleting product")
    }

    res.status(200).json({message:'product deleted seccussfuly'})
}

const updateProductController = async (req, res) => {
    let respons
    const productId = req.params.productId;
    const { productName, productPicture, price,count } = req.body;
    if (!productId) {
        return res.status(500).send("productId to update is required")
    }

    respons = await updateProduct({ productName, productId, productPicture, price, count });

    if (!respons) {
        return res.status(500).json({ success: false, message: "error while updating product" })
    }
    res.status(200).json({ ...respons?._doc, productPicture: `${PICTURE_URI + respons._doc.productPicture}` })
}

const addProductController = async (req, res) => {
  
   const { filename } = req?.file;
  
  

    const { productName, price, count } = req.body;

    // Check if any of the required fields is undefined
    if (productName === 'undefined' || price === 'undefined' || count === 'undefined' || filename === 'undefined'||
    !productName  || !price || !count || !filename 
    ) {
        return res.status(501).json({ success: false, message: 'All fields are required' });
    }

    const respons = await addNewProduct({ productName, price, count, filename });

    if (!respons) {
        return res.status(502).json({ success: false, message: 'Error while adding new product' });
    }

    res.status(200).json({ ...respons._doc, productPicture: `${PICTURE_URI + respons._doc.productPicture}` });
};



module.exports = {
    productsController,
    singleProductController,
    updateProductController,
    deleteProductController,
    addProductController
};