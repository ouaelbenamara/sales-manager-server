const mongoose = require('mongoose');

const salesSchema = new mongoose.Schema({
    saleName: { type: String, required: true },
    price: { type: Number, default: 0 },
    buyPrice: { type: Number, default: 0 },
    count: { type: Number, default: 0 },
    createdAt: {
        type: String, // Store the date as a string
        default: function () {
            // Format the current date to include only day, month, and year
            const currentDate = new Date();
            return currentDate.toLocaleDateString('en-US'); // Adjust the locale as needed
        }
    }
});

const Sale = mongoose.model('Sale', salesSchema);

module.exports = Sale;
