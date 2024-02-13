const Product = require("../schema/Product")


const addNewProduct =async ({ productName, productPicture, price })=>{
    if (!productName || !productPicture || !price){
        return false
    }
    try{
        const newProduct = new Product({
            productName,
            productPicture,
            price
        })
      return  await  newProduct.save()
    }catch(err){
        console.log(err)
        return false
    }

}
const deleteProduct = async ({ productIdToDelete })=>{
    if (!productIdToDelete){
        return false
    }
    try {
        const deletedUser = await Product.findByIdAndDelete(productIdToDelete);
        // console.log(deletedUser);
    } catch (e) {
        console.log('error while finding a product on the database', e)
        return false;
    }
    return true


}


async function updateProduct({ productId,productName,productPicture,price }) {
    try {
        let updateObject = {};
        // console.log(id)
        if (productName !== undefined) {
            updateObject.productName = productName;
        }

        if (productPicture !== undefined) {
            updateObject.productPicture = productPicture;
        }

        if (price !== undefined) {
            updateObject.price = price;
        }

    

        const updatedProduct = await Product.findByIdAndUpdate(productId, { $set: updateObject }, { new: true });
        // console.log(updatedUser);

        return true;
    } catch (error) {
        console.log('Error while updating product on the database', error);
        return false;
    }
}

const getProducts =async ()=>{

    let products;
    try {
        products = await Product.find();

    } catch (e) {
        console.log('error while grabing products from the  database', e)
        return false;
    }
    return products;

}

const getProduct = async (productId) => {
    let product;
    try {
        product = await Product.findById(productId);

    } catch (e) {
        console.log('error while finding the Product on the database', e)
        return false;
    }
    return product;

}


module.exports = {
    deleteProduct,
    addNewProduct,
    updateProduct,
    getProduct,
    getProducts
}