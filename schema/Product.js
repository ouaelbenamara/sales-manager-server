const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    productName: { type: String, required: true },
    price: { type: String, required: true },
    productPicture: { type: String, default:false }
})


const Product = mongoose.model('Product', productSchema);

module.exports = Product;
