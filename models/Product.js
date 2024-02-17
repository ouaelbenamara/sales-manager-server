const Product = require("../schema/Product");
const { addNewPictureBase65, getItemsPicturesBase65 } = require('../services/jsonManager')
const { base64ToBinary } = require('../lib/utils')
const fs = require('fs');
const path = require('path');

const addNewProduct = async ({ productName, price, count, filename }) => {
    if (!productName || !price  || count === undefined) {
        console.log('false')

        return false;
    }



    try {


        const newProduct = new Product({
            productName,
            productPicture: filename,
            price,
            count
        });

        const res = await newProduct.save();



        // Save the image file to a folder
        // const imagePath = path.join(__dirname, 'your_image_folder', `${newProduct._id}.jpg`); // Adjust the folder name and file extension as needed
        // fs.writeFileSync(imagePath, imageBuffer);

        return res
    } catch (err) {
        console.error(err);
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
            // const imagePath = `./db/${productToDelete.productPicture}`;

            // await fs.unlink(imagePath); // Delete the file

            console.log(`Product ${productIdToDelete} and Image ${productToDelete.productPicture} deleted successfully.`);
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


async function updateProduct({ productId, productName, productPicture, price, count }) {
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
        if (count !== undefined) {
            updateObject.count = count;
        }



        const updatedProduct = await Product.findByIdAndUpdate(productId, { $set: updateObject }, { new: true });
        // console.log(updatedUser);

        return true;
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