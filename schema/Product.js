const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    productName: { type: String, required: true },
    price: { type: Number, default: 0 },
    buyPrice: { type: Number, default: 0 },
    productPicture: { type: String, default: null },
    count: { type: Number, default: 0 }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
