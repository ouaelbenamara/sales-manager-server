const mongoose = require('mongoose');
const salesSchema = new mongoose.Schema({
    saleName: { type: String, required: true,},
    price: { type: Number, default: 0 },
    count: { type: Number, default: 0 }
});

const Sale = mongoose.model('Sale', salesSchema);

module.exports = Sale;
