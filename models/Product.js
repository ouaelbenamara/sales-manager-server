const Product = require("../schema/Product");
const fs = require('fs');
const path = require('path');

const addNewProduct = async ({ productName, price, buyPrice,count, filename }) => {
    console.log(productName,!productName,'asd',)
    if (productName == undefined || price === undefined || count === undefined || buyPrice===undefined||
        !productName || !price || !count || !buyPrice
        ) {


        return false;
    }



    try {


        const newProduct = new Product({
            productName,
            productPicture: filename,
            price,
            buyPrice,
            count
        });

        const res = await newProduct.save();



        // Save the image file to a folder
        // const imagePath = path.join(__dirname, 'your_image_folder', `${newProduct._id}.jpg`); // Adjust the folder name and file extension as needed
        // fs.writeFileSync(imagePath, imageBuffer);

        return res
    } catch (err) {
        console.error('error',err);
        return false;
    }
};

const deleteProduct = async ({ productIdToDelete }) => {
    if (!productIdToDelete) {
        return false;
    }

    try {
        // Find the product first to get the productPicture
        const productToDelete = await Product.findById(productIdToDelete);

        if (!productToDelete) {
            console.log('Product not found.');
            return false;
        }

        // Delete the product
        const deletedProduct = await Product.deleteOne({ _id: productIdToDelete });

        if (deletedProduct.deletedCount > 0) {
            // // If the product is found and deleted, remove the corresponding image file
            const imagePath = `./db/${productToDelete.productPicture}`;
  
             fs.unlink(imagePath,(err) => {
    if (err) {
        console.error(`Error deleting file: ${err.message}`);
    } else {
        console.log('File deleted successfully');
    }
}); // Delete the file

        } else {
            console.log('Product not deleted.');
            return false;
        }
    } catch (e) {
        console.log('Error while deleting a product from the database', e);
        return false;
    }

    return true;
};


async function updateProduct({ productId, productName=null, productPicture=null, price=null, count=null,buyPrice=null }) {
    try {
        let updateObject = {};
        if (productName !== null) {
            updateObject.productName = productName;
        }
        if (buyPrice !== null) {
            updateObject.buyPrice = buyPrice;
        }

        if (productPicture !== null) {
            updateObject.productPicture = productPicture;
        }

        if (price !== null) {
            updateObject.price = price;
        }
        if (count !== null) {
            updateObject.count = count;
        }


        const updatedProduct = await Product.findByIdAndUpdate(productId, { $set: updateObject }, { new: true });

        return updatedProduct;
    } catch (error) {
        console.log('Error while updating product on the database', error);
        return false;
    }
}

const getProducts = async () => {

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