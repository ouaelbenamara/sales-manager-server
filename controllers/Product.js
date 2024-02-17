
const { addNewProduct, deleteProduct, updateProduct, getProducts, getProduct,  } = require('../models/Product');

const productsController = async (req, res) => {
    let respons = await getProducts();


    respons = respons.map(product => ({
        _id: product._id,
        productName: product.productName,
        picture: `http://localhost:5000/db/${product.productPicture}`, // Construct the URL to the image
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
    // console.log(productId)
    const product = {
        _id: respons._id,
        productName: respons.productName,
        picture: respons.productPicture,
        price: respons.price,
        count: respons.count
    }
    // console.log(product)
    res.status(200).json(product)
}


const deleteProductController = async (req, res) => {
    const productId = req.params.productId;
    if (!productId) {
        return res.status(500).send("productId to delete is required")
    }
    const respons = await deleteProduct({ productIdToDelete: productId });
    // console.log(respons)
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
    if (productName) {
        // console.log(hash, salt)
        respons = await updateProduct({  productName, productId });
    } else if (productPicture) {
        respons = await updateProduct({ productId, productPicture });

    } else if (price) {
        respons = await updateProduct({ productId, price });
    }else if(count){
        respons = await updateProduct({ productId, count });

    }
    // console.log(respons)
    if (!respons) {
        return res.status(500).json({ success: false, message: "error while updating product" })
    }
    // console.log(respons)
    res.status(200).json({ success: true, message: 'product updated successfully' })
}

const addProductController = async(req,res)=>{
console.log('BODYY',req.body,'FILELL',req.file)
    const { filename } = req.file;
console.log(filename)
    const { productName, price,count } = req.body
    if (!productName  || !price||!filename){
        console.log("consoles",productName, price,count)
        return res.status(501).json({success:false,message:'all fields are required'})
    }

    const respons = await addNewProduct({ productName, price,count,filename })
   if(!respons){
       return res.status(501).json({ success: false, message: 'error while addding new product' })

   }
   

    res.status(200).json(respons)
    

}



module.exports = {
    productsController,
    singleProductController,
    updateProductController,
    deleteProductController,
    addProductController
};