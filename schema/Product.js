const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    productName: { type: String, required: true },
    price: { type: String, required: true },
    productPicture: { type: String }, // Store the filename or URL of the stored image
    count: { type: Number, default: 0 }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
